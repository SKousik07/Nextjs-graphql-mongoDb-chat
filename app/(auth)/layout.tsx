import "../../styles/Auth.css"
export default function AuthLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className="full-screen-center">
        {children}
      </main>
    )
  }