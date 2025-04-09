import { lazy, useState, useEffect } from "react";
import { cn } from "../lib/classname";
import defaultEmailJSON from "../lib/default-editor-json.json";
import { useSearchParams } from "react-router";
import Cookies from 'js-cookie';
import type { Editor as EditorType } from '@maily-to/core';
import { Layout } from "~/root";

const Editor = lazy(async () => {
    const module = await import('@maily-to/core');
    return { default: module.Editor as typeof EditorType };
});

const EDITOR_CONTENT_COOKIE = 'editor_content';

export default function EditorWindow() {
    const [searchParams] = useSearchParams();
    const [initialContent, setInitialContent] = useState(defaultEmailJSON);

    useEffect(() => {
        // First check URL parameter
        const jsonParam = searchParams.get('json');
        if (jsonParam) {
            try {
                setInitialContent(JSON.parse(jsonParam));
                return;
            } catch (e) {
                console.error('Failed to parse JSON from URL parameter', e);
            }
        }
        
        // Then check cookie if URL parameter is not available
        const savedContent = Cookies.get(EDITOR_CONTENT_COOKIE);
        if (savedContent) {
            try {
                setInitialContent(JSON.parse(savedContent));
            } catch (e) {
                console.error('Failed to parse saved editor content', e);
            }
        }
        // If both are null, default content will be used (already set in state)
    }, [searchParams]);

    async function printHtml() {
        // get json from cookie
        const savedContent = Cookies.get(EDITOR_CONTENT_COOKIE);
        // do post request to api.v1.emails.preview
        const response = await fetch('/api/v1/editor/html', {
            method: 'POST',
            body: JSON.stringify({ content: savedContent }),
        });
        const data = await response.json();
        console.log(data);
    }

    async function printJson() {
        const savedContent = Cookies.get(EDITOR_CONTENT_COOKIE);
        const response = await fetch('/api/v1/editor/json', {
            method: 'POST',
            body: JSON.stringify({ content: savedContent }),
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <>
            <button onClick={printHtml}>Print HTML</button>
            <button onClick={printJson}>Print JSON</button>
            <Layout>
            <Editor
                config={{
                    hasMenuBar: false,
                    wrapClassName: cn('editor-wrap'),
                    bodyClassName: '!mt-0 !border-0 !p-0',
                    contentClassName: `editor-content mx-auto max-w-[calc(600px+80px)]! px-10! pb-10!`,
                    toolbarClassName: 'flex-wrap !items-start',
                    spellCheck: false,
                    autofocus: 'end',
                    immediatelyRender: false,
                }}
                contentJson={initialContent}
                onUpdate={(editor) => {
                    // Save editor content to cookie
                    const content = editor.getJSON();
                    Cookies.set(EDITOR_CONTENT_COOKIE, JSON.stringify(content), { expires: 7 });
                }}
            />
            </Layout>
        </>
    );
}
