import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '../utils/blog';
import { Calendar, ArrowLeft } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = getPostBySlug(slug);
    if (!foundPost) {
      navigate('/blog', { replace: true });
    } else {
      setPost(foundPost);
    }
  }, [slug, navigate]);

  if (!post) {
    return null; // lub spinner
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <Helmet>
        <title>{post.title} | Osada Dzianisz N54</title>
        <meta name="description" content={post.description} />
      </Helmet>

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-gray-500 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Wróć do bloga
          </Link>
        </div>

        <article className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <header className="mb-10 text-center">
            <div className="flex items-center justify-center text-accent mb-4 text-sm font-medium">
              <Calendar className="w-4 h-4 mr-2" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('pl-PL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-500 italic max-w-2xl mx-auto">
              {post.description}
            </p>
          </header>
          
          <div className="w-24 h-1 bg-accent/30 mx-auto mb-10 rounded-full"></div>

          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-a:text-accent hover:prose-a:text-accent/80 prose-p:text-gray-700">
            <ReactMarkdown>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
