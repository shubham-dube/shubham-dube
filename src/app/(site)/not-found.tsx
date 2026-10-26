import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <Container style={{ minHeight: '80svh', display: 'grid', alignContent: 'center', gap: 'var(--s-5)', paddingTop: 'var(--header-h)' }}>
      <p className="mono" style={{ color: 'var(--accent)' }}>
        404
      </p>
      <h1 className="display" style={{ fontSize: 'var(--t-3xl)', maxWidth: '14ch' }}>
        This page isn’t <em>here.</em>
      </h1>
      <p style={{ color: 'var(--fg-2)', maxWidth: '40ch' }}>The link may be old. Everything I’ve built is one click away.</p>
      <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
        <ButtonLink href="/" variant="primary" icon="arrowRight">
          Home
        </ButtonLink>
        <ButtonLink href="/work">All projects</ButtonLink>
      </div>
    </Container>
  );
}
