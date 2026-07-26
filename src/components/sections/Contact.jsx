// src/components/sections/Contact.jsx
//
// Contact section. Since this site has no backend (see README > Hosting),
// we intentionally avoid a fake contact form that goes nowhere — instead
// we offer a direct `mailto:` link plus the social links, and a
// "copy email" convenience button.
//
// If you later add a backend or a service like Formspree/EmailJS, this is
// the component to extend with an actual <form>.

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { FiMail, FiCopy, FiCheck } from 'react-icons/fi';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import { getIcon } from '../../utils/iconMap';

function Contact({ profile, social }) {
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Edge case: clipboard API unavailable (older browsers, insecure
      // context) — fail silently, the mailto link below still works.
    }
  }

  return (
    <section id="contact" className="section-shell">
      <Container className="container-app">
        <SectionTitle eyebrow="Get In Touch" title="Let's Build Something" align="center" />

        <GlassCard className="contact-card mx-auto" style={{ maxWidth: 640 }}>
          <p className="text-muted-custom mb-4">
            Please reach out for any questions or opportunities!
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn-glass btn-glass-primary">
              <FiMail aria-hidden="true" /> Email Me
            </a>
            <button type="button" className="btn-glass" onClick={handleCopyEmail}>
              {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
              {copied ? 'Copied!' : profile.email}
            </button>
          </div>

          <div className="contact-social-row">
            {social.map((link) => {
              const Icon = getIcon(link.icon);
              return (
                <a
                  key={link.id}
                  href={link.url}
                  className="icon-link"
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noreferrer noopener' : undefined}
                  aria-label={link.platform}
                >
                  <Icon aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}

Contact.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  social: PropTypes.array.isRequired,
};

export default Contact;
