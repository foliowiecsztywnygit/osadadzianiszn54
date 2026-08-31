// Pobierz wszystkie pliki markdown z folderu blog
const mdFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', eager: true });

export function getAllPosts() {
  const posts = Object.entries(mdFiles).map(([path, file]) => {
    // Vite import.meta.glob z query '?raw' w Vite 4/5/6 zwraca obiekt z { default: string }
    const rawContent = file.default || file;
    
    let data = {};
    let content = rawContent;
    
    // Prosty parser frontmatter
    const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (match) {
      const frontmatter = match[1];
      content = match[2];
      
      frontmatter.split(/\r?\n/).forEach(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx !== -1) {
          const key = line.slice(0, colonIdx).trim();
          let value = line.slice(colonIdx + 1).trim();
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          } else if (value.startsWith("'") && value.endsWith("'")) {
            value = value.slice(1, -1);
          }
          data[key] = value;
        }
      });
    }

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
