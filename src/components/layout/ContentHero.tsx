import Container from "@/components/ui/Container";

interface ContentHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function ContentHero({
  eyebrow,
  title,
  description,
}: ContentHeroProps) {
  return (
    <section className="bg-sage pb-14 pt-28 md:pb-16 md:pt-32">
      <Container>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage-light">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-4xl font-semibold text-cream md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/80 md:text-base">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
