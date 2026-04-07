'use server';

import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

const CATEGORIES = [
  'Web Dev',
  'Data Structures',
  'Algorithms',
  'Machine Learning',
  'Physics',
  'Mathematics',
  'Database',
  'DevOps',
  'Mobile Dev',
  'System Design',
  'Other',
];

export async function createResource(formData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: 'You must be signed in to post a resource.' };
  }

  const title = formData.get('title')?.toString().trim();
  const url = formData.get('url')?.toString().trim();
  const category = formData.get('category')?.toString().trim();
  const description = formData.get('description')?.toString().trim() || null;


  if (!title || title.length < 3) {
    return { error: 'Title must be at least 3 characters.' };
  }
  if (!url) {
    return { error: 'URL is required.' };
  }
  try {
    new URL(url);
  } catch {
    return { error: 'Please enter a valid URL (include https://).' };
  }
  if (!category || !CATEGORIES.includes(category)) {
    return { error: 'Please select a valid category.' };
  }

  const supabase = createServerSupabaseClient();

  await supabase.from('profiles').upsert(
    {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    },
    { onConflict: 'id' }
  );

  const { error } = await supabase.from('resources').insert({
    title,
    url,
    category,
    description,
    user_id: session.user.id,
    upvote_count: 0,
  });

  if (error) {
    console.error('createResource error:', error);
    return { error: 'Failed to create resource. Please try again.' };
  }

  revalidatePath('/');
  return { success: true };
}


export async function toggleUpvote(resourceId) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: 'You must be signed in to upvote.' };
  }

  const supabase = createServerSupabaseClient();
  const userId = session.user.id;


  await supabase.from('profiles').upsert(
    {
      id: userId,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    },
    { onConflict: 'id' }
  );


  const { data: existing } = await supabase
    .from('upvotes')
    .select('id')
    .eq('user_id', userId)
    .eq('resource_id', resourceId)
    .maybeSingle();

  if (existing) {
  
    await supabase
      .from('upvotes')
      .delete()
      .eq('user_id', userId)
      .eq('resource_id', resourceId);

    await supabase.rpc('decrement_upvote', { resource_id: resourceId });

    revalidatePath('/');
    return { upvoted: false };
  } else {
  
    await supabase.from('upvotes').insert({
      user_id: userId,
      resource_id: resourceId,
    });

   
    await supabase.rpc('increment_upvote', { resource_id: resourceId });

    revalidatePath('/');
    return { upvoted: true };
  }
}


export async function deleteResource(resourceId) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: 'You must be signed in to delete a resource.' };
  }

  const supabase = createServerSupabaseClient();
  const { error } = await supabase
    .from('resources')
    .delete()
    .eq('id', resourceId)
    .eq('user_id', session.user.id);

  if (error) {
    console.error('deleteResource error:', error);
    return { error: 'Failed to delete resource.' };
  }

  revalidatePath('/');
  return { success: true };
}


export async function updateResource(resourceId, formData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: 'You must be signed in to update a resource.' };
  }

  const title = formData.get('title')?.toString().trim();
  const url = formData.get('url')?.toString().trim();
  const category = formData.get('category')?.toString().trim();
  const description = formData.get('description')?.toString().trim() || null;


  if (!title || title.length < 3) {
    return { error: 'Title must be at least 3 characters.' };
  }
  if (!url) {
    return { error: 'URL is required.' };
  }
  try {
    new URL(url);
  } catch {
    return { error: 'Please enter a valid URL (include https://).' };
  }
  if (!category || !CATEGORIES.includes(category)) {
    return { error: 'Please select a valid category.' };
  }

  const supabase = createServerSupabaseClient();
  const { error } = await supabase
    .from('resources')
    .update({ title, url, category, description })
    .eq('id', resourceId)
    .eq('user_id', session.user.id); 

  if (error) {
    console.error('updateResource error:', error);
    return { error: 'Failed to update resource. Please try again.' };
  }

  revalidatePath('/');
  return { success: true };
}
