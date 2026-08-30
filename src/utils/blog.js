import matter from 'gray-matter';

// Pobierz wszystkie pliki markdown z folderu blog
const mdFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', eager: true });

export function getAllPosts() {
  const posts = Object.entries(mdFiles).map(([path, file]) => {
    // Vite import.meta.glob z query '?raw' w Vite 4/5/6 zwraca obiekt z { default: string }
    const rawContent = file.default || file;
    const { data, content } = matter(rawContent);

    return {
      title: data.title || 'Brak tytułu',
      description: data.description || '',
      date: data.date || '',
      slug: data.slug || path.replace('.md', '').split('/').pop(),
      content
    };
  });

  // Sortowanie po dacie od najnowszego
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}
