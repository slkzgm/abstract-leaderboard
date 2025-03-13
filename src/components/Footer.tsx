// src/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 text-center">
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        Made with ❤️ by{' '}
        <a
          href="https://github.com/slkzgm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 dark:text-primary-400 hover:underline"
        >
          SLK
        </a>{' '}
        © {new Date().getFullYear()}
      </p>
    </footer>
  )
}
