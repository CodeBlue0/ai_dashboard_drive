import Header from './Header';

export default function Layout({ children }) {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white overflow-x-hidden flex flex-col">
            <Header />
            <main className="layout-container flex h-full grow flex-col">
                {children}
            </main>
        </div>
    );
}
