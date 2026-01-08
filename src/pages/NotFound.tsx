import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/layouts/Section";
import { CTA } from "@/components/layouts/CTA";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <Section tone="muted" className="min-h-[70vh] flex items-center">
        <div className="container-narrow">
          <CTA
            eyebrow="404"
            title="Page not found"
            description="The page you’re looking for doesn’t exist or may have been moved."
            primaryHref="/"
            primaryLabel="Return to Home"
            secondaryHref="/contact"
            secondaryLabel="Contact Us"
          />
        </div>
      </Section>
    </Layout>
  );
};

export default NotFound;
