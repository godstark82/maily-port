import NextImage from 'next/image';
import NextLink from 'next/link';
import ArrowImage from '@/public/arrow.svg';
import { Icons } from '@/components/icons';

export const dynamic = 'force-static';

export default function LandingPage() {
  return (
    <div>
      <div className="border-b-8 border-t-8 border-b-black border-t-black">
        <div className="relative mx-auto max-w-[1050px] px-7 sm:px-10">
          <div className="flex items-center justify-start gap-4 py-10 md:py-14 lg:py-20">
            <div className="flex-grow">
              <h1 className="mb-2 text-6xl font-black sm:text-7xl md:mb-3 md:text-8xl lg:mb-4 lg:text-9xl">
                Mailofly
              </h1>
              <p className="text-md md:text-2xl lg:text-3xl">
                Port of Maily.to for Mailofly
              </p>
              <a href="/playground">
                Go to Editor
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black py-8 text-white">
        <div className="mx-auto max-w-[1050px] px-7 sm:px-10">
          <p className="text-center text-lg text-white">
            Based on{' '}
            <a
              className="hover:text-red-300"
              href="https://github.com/arikchakma/maily.to"
              rel="noopener noreferrer"
              target="_blank"
            >
              Maily.to
            </a>
            {' '}by{' '}
            <a
              className="hover:text-red-300"
              href="https://twitter.com/imarikchakma"
              rel="noopener noreferrer"
              target="_blank"
            >
              Arik Chakma
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
