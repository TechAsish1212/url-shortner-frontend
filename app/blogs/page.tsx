"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Calendar, Clock, User, ArrowRight, Rss, Frown } from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/app/lib/blogs";

const CATEGORIES = ["All", "Performance", "Security", "Marketing", "Analytics"];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Find the featured post (only if no filtering is actively happening)
  const featuredPost = useMemo(() => {
    if (selectedCategory !== "All" || searchQuery.trim() !== "") {
      return null;
    }
    return BLOG_POSTS.find((post) => post.featured) || BLOG_POSTS[0];
  }, [selectedCategory, searchQuery]);

  // Recent posts list (excluding featured post when it is displayed at the top)
  const recentPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((post) => post.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <div className="bg-background text-on-surface selection:bg-primary-fixed-dim selection:text-on-primary-fixed min-h-screen">
      <main className="pt-24 pb-20">
        
        {/* Hero Section */}
        <section className="px-margin-mobile md:px-margin-desktop py-12 border-b border-outline-variant/60 hero-gradient relative">
          <div className="max-w-container-max mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-label-sm text-label-sm text-primary">
              <Rss className="h-3.5 w-3.5" />
              <span>CrixLink Insights</span>
            </div>
            
            <h1 className="font-display-lg text-display-lg text-on-surface leading-tight">
              Updates, guides, and engineering <br className="hidden md:inline" />
              at the <span className="text-primary font-extrabold">network edge</span>.
            </h1>
            
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Explore deep dives into URL optimization, high-performance edge computing, analytics strategies, and security tips to power your campaigns.
            </p>
          </div>
        </section>

        {/* Filters and Search Control Bar */}
        <section className="px-margin-mobile md:px-margin-desktop py-8 sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-outline-variant/30">
          <div className="max-w-container-max mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-200 cursor-pointer ${
                    selectedCategory === category
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Search articles or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md placeholder:text-outline-variant outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-on-surface"
                >
                  ✕
                </button>
              )}
            </div>

          </div>
        </section>

        {/* Blog Content Section */}
        <section className="px-margin-mobile md:px-margin-desktop py-12">
          <div className="max-w-container-max mx-auto space-y-16">
            
            {/* Featured Post Card */}
            {featuredPost && (
              <div className="space-y-6">
                <h2 className="font-headline-md text-headline-sm text-outline uppercase tracking-wider">Featured Article</h2>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 hover:border-primary transition-all duration-300 group shadow-sm hover:shadow-md">
                  {/* Image Column */}
                  <div className="lg:col-span-7 h-[300px] sm:h-[400px] lg:h-auto overflow-hidden relative">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full font-label-sm text-label-sm">
                      {featuredPost.category}
                    </div>
                  </div>
                  {/* Details Column */}
                  <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      {/* Post Date & Time */}
                      <div className="flex items-center gap-4 text-outline font-label-sm text-label-sm">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {featuredPost.publishedAt}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {featuredPost.readTime}
                        </span>
                      </div>

                      {/* Post Title */}
                      <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors leading-tight">
                        <Link href={`/blogs/${featuredPost.slug}`}>{featuredPost.title}</Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    {/* Author & Footer Link */}
                    <div className="pt-6 border-t border-outline-variant flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          className="h-10 w-10 rounded-full object-cover border border-outline-variant"
                        />
                        <div>
                          <p className="font-label-md text-label-md text-on-surface font-bold leading-tight">
                            {featuredPost.author.name}
                          </p>
                          <p className="font-label-sm text-xs text-outline leading-tight">
                            {featuredPost.author.role}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/blogs/${featuredPost.slug}`}
                        className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Posts Grid */}
            <div className="space-y-6">
              {featuredPost && (
                <h2 className="font-headline-md text-headline-sm text-outline uppercase tracking-wider">Recent Publications</h2>
              )}

              {filteredPosts.length === 0 ? (
                // Empty State
                <div className="text-center py-16 px-4 bg-surface-container border border-outline-variant/60 rounded-3xl space-y-4 max-w-xl mx-auto">
                  <span className="material-symbols-outlined text-outline text-5xl"><Frown/></span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">No articles found</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto">
                    We couldn't find any articles matching "{searchQuery}" in "{selectedCategory}". Try adjusting your query or tags.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                    }}
                    className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold hover:scale-105 active:scale-95 transition-transform"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                // Grid Content
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                  {recentPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-surface-container-lowest border border-outline-variant rounded-3xl overflow-hidden hover:border-primary transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-md"
                    >
                      {/* Image section */}
                      <div>
                        <div className="h-52 overflow-hidden relative">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                          />
                          <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full font-label-sm text-label-sm shadow-sm">
                            {post.category}
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="p-6 space-y-4">
                          {/* Date and Read Time */}
                          <div className="flex items-center gap-3 text-outline font-label-sm text-label-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {post.publishedAt}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                            <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                          </h3>

                          {/* Excerpt */}
                          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Footer & Author */}
                      <div className="p-6 pt-0">
                        <div className="pt-4 border-t border-outline-variant/60 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="h-8 w-8 rounded-full object-cover border border-outline-variant"
                            />
                            <div className="overflow-hidden">
                              <p className="font-label-md text-label-md text-on-surface font-bold leading-tight truncate">
                                {post.author.name}
                              </p>
                              <p className="font-label-sm text-xs text-outline leading-tight truncate">
                                {post.author.role}
                              </p>
                            </div>
                          </div>

                          <Link
                            href={`/blogs/${post.slug}`}
                            className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 shrink-0"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>

                    </article>
                  ))}
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Newsletter CTA Section */}
        <section className="px-margin-mobile md:px-margin-desktop pt-12">
          <div className="max-w-container-max mx-auto">
            <div className="bg-inverse-surface text-inverse-on-surface rounded-[2.5rem] p-8 md:p-16 text-center space-y-6 max-w-4xl mx-auto shadow-xl">
              <h2 className="font-display-lg text-headline-md font-bold">Stay up to date with CrixLink</h2>
              <p className="font-body-lg text-body-md opacity-85 max-w-md mx-auto">
                Get notified when we publish new posts on performance optimization, analytics strategies, and web security.
              </p>

              {subscribed ? (
                <div className="p-4 bg-primary-container text-on-primary-container rounded-2xl max-w-md mx-auto animate-float-up font-bold">
                  ✓ Thanks for subscribing! Please check your inbox.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-4">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-xl bg-surface-container-lowest/10 border border-outline/35 text-white font-body-md placeholder:text-inverse-on-surface/50 outline-none focus:border-primary-fixed transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 bg-primary-fixed text-on-primary-fixed font-bold rounded-xl hover:scale-105 active:scale-95 transition-transform shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
