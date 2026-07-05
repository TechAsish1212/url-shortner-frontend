import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, ArrowRight, Share2, Link2 } from "lucide-react";
import { getBlogBySlug, getRelatedBlogs } from "@/app/lib/blogs";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) {
    return {
      title: "Article Not Found | CrixLink Blog",
    };
  }
  return {
    title: `${post.title} | CrixLink Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogs(slug, 3);

  return (
    <div className="bg-background text-on-surface selection:bg-primary-fixed-dim selection:text-on-primary-fixed min-h-screen">
      <main className="pt-24 pb-20">
        
        {/* Main Article Container */}
        <article className="px-margin-mobile md:px-margin-desktop">
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Back Navigation & Breadcrumb */}
            <div className="flex items-center justify-between">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-outline hover:text-primary transition-colors font-label-md text-label-md"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to articles
              </Link>

              <span className="font-label-sm text-label-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            {/* Title Section */}
            <div className="space-y-4">
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight font-extrabold">
                {post.title}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed italic">
                {post.excerpt}
              </p>
            </div>

            {/* Author and Date Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-outline-variant/60">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-12 w-12 rounded-full object-cover border border-outline-variant"
                />
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold leading-tight">
                    {post.author.name}
                  </p>
                  <p className="font-label-sm text-xs text-outline leading-tight">
                    {post.author.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-outline font-label-sm text-label-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {post.publishedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Cover Image */}
            <div className="h-[250px] sm:h-[400px] rounded-3xl overflow-hidden border border-outline-variant">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content Render Area */}
            <div className="py-6 space-y-6">
              {post.content.map((section, idx) => {
                switch (section.type) {
                  case "paragraph":
                    return (
                      <p
                        key={idx}
                        className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed"
                      >
                        {section.content as string}
                      </p>
                    );
                  case "heading-2":
                    return (
                      <h2
                        key={idx}
                        className="font-headline-md text-headline-md text-on-surface font-bold pt-6 pb-2"
                      >
                        {section.content as string}
                      </h2>
                    );
                  case "heading-3":
                    return (
                      <h3
                        key={idx}
                        className="font-headline-sm text-headline-sm text-on-surface font-bold pt-4 pb-1"
                      >
                        {section.content as string}
                      </h3>
                    );
                  case "list":
                    return (
                      <ul
                        key={idx}
                        className="list-disc pl-6 space-y-3 font-body-lg text-body-lg text-on-surface-variant"
                      >
                        {(section.content as string[]).map((item, itemIdx) => (
                          <li key={itemIdx}>{item}</li>
                        ))}
                      </ul>
                    );
                  case "quote":
                    return (
                      <blockquote
                        key={idx}
                        className="border-l-4 border-primary pl-6 italic font-body-lg text-primary/95 my-8 bg-primary/5 py-5 pr-6 rounded-r-3xl"
                      >
                        {section.content as string}
                      </blockquote>
                    );
                  case "code":
                    return (
                      <pre
                        key={idx}
                        className="bg-surface-container-high border border-outline-variant p-4 rounded-xl font-mono text-sm overflow-x-auto my-6 text-on-surface"
                      >
                        <code>{section.content as string}</code>
                      </pre>
                    );
                  default:
                    return null;
                }
              })}
            </div>

            {/* Tags and Share Options */}
            <div className="pt-8 border-t border-outline-variant/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 bg-surface-container text-on-surface-variant border border-outline-variant rounded-xl font-label-sm text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Fake Social Share Links */}
              <div className="flex items-center gap-3">
                <span className="font-label-sm text-xs text-outline uppercase tracking-wider flex items-center gap-1">
                  <Share2 className="h-3.5 w-3.5" /> Share:
                </span>
                <button
                  aria-label="Share on X"
                  className="h-8 w-8 rounded-full border border-outline-variant flex items-center justify-center text-outline hover:text-primary hover:border-primary transition-colors cursor-pointer"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button
                  aria-label="Share on LinkedIn"
                  className="h-8 w-8 rounded-full border border-outline-variant flex items-center justify-center text-outline hover:text-primary hover:border-primary transition-colors cursor-pointer"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </button>
                <button
                  aria-label="Copy Link"
                  className="h-8 w-8 rounded-full border border-outline-variant flex items-center justify-center text-outline hover:text-primary hover:border-primary transition-colors cursor-pointer"
                >
                  <Link2 className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        </article>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 py-16 bg-surface-container-low border-t border-outline-variant/50 px-margin-mobile md:px-margin-desktop">
            <div className="max-w-container-max mx-auto space-y-10">
              <div className="flex items-center justify-between max-w-3xl mx-auto md:max-w-none">
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Recommended Articles
                </h2>
                <Link
                  href="/blogs"
                  className="font-label-md text-label-md text-primary font-bold hover:underline flex items-center gap-1.5"
                >
                  All articles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter max-w-3xl mx-auto md:max-w-none">
                {relatedPosts.map((rPost) => (
                  <article
                    key={rPost.id}
                    className="bg-surface-container-lowest border border-outline-variant rounded-3xl overflow-hidden hover:border-primary transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-md"
                  >
                    <div>
                      <div className="h-44 overflow-hidden relative">
                        <img
                          src={rPost.image}
                          alt={rPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                        <div className="absolute top-3 left-3 bg-primary text-on-primary px-2.5 py-0.5 rounded-full font-label-sm text-xs shadow-sm">
                          {rPost.category}
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-2.5 text-outline font-label-sm text-xs">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {rPost.publishedAt}
                          </span>
                        </div>

                        <h3 className="font-headline-sm text-base text-on-surface font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          <Link href={`/blogs/${rPost.slug}`}>{rPost.title}</Link>
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <div className="pt-3 border-t border-outline-variant/60 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={rPost.author.avatar}
                            alt={rPost.author.name}
                            className="h-7 w-7 rounded-full object-cover"
                          />
                          <span className="font-label-md text-xs text-on-surface font-semibold truncate max-w-[120px]">
                            {rPost.author.name}
                          </span>
                        </div>

                        <Link
                          href={`/blogs/${rPost.slug}`}
                          className="h-7 w-7 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 shrink-0"
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
