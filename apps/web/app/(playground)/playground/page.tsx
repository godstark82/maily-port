import type { Metadata } from 'next';
import { EditorPreview } from '@/components/editor-preview';

export const metadata: Metadata = {
  title: 'Mailofly Mail Editor',
  description: 'Email Template Editor for Mailofly',
};

export default async function Playground() {
  return (
    <main className="mx-auto w-full max-w-[calc(600px+40px)] px-5">

      
      <EditorPreview />
    </main>
  );
}
