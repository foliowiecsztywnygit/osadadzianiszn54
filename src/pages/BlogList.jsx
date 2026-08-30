import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/blog';
import { Calendar, ChevronRight } from 'lucide-react';

const BlogList = () => {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <Helmet>
        <title>Blog - Aktualności i Wpisy | Osada Dzianisz N54</title>
        <meta name="description" content="Przeczytaj najnowsze wpisy, aktualności i artykuły dotyczące naszej osady oraz lokalnych atrakcji." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Nasz Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Odkryj ciekawostki o naszej okolicy, nowości w osadzie i porady dotyczące idealnego wypoczynku w górach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              to={`/blog/${post.slug}`}
              className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center text-accent mb-4 text-sm font-medium">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('pl-PL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                
                <h2 className="text-2xl font-serif text-foreground mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                  {post.description}
                </p>
                
                <div className="flex items-center text-accent font-medium mt-auto group-hover:translate-x-1 transition-transform">
                  Czytaj dalej
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center text-gray-500 py-12 bg-white rounded-xl border border-gray-100">
            <p>Jeszcze nie opublikowaliśmy żadnego artykułu. Wróć wkrótce!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
