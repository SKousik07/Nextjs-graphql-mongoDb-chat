export default function AuthLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        Auth
        {children}
      </section>
    )
  }