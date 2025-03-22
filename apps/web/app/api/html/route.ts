import { NextResponse } from 'next/server';
import { render } from '@maily-to/render';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Get the current editor content from the playground
    const cookieStore = cookies();
    const editorContent = cookieStore.get('editor_content')?.value;
    
    if (!editorContent) {
      return new NextResponse('No editor content found', { status: 400 });
    }

    const content = JSON.parse(editorContent);
    const html = await render(content, {
      preview: 'Preview of your email',
    });

    // Return the HTML with proper content type and headers
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error rendering email:', error);
    return new NextResponse('Failed to render email', { status: 500 });
  }
} 