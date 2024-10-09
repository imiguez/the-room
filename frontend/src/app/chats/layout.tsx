'use client'

export default function ChatsPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="layout">{children}</section>
}