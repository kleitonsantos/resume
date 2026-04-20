import "./styles.css";
import { cvPtBr } from "./content/cv.pt-BR";
import type {
  ContactItem,
  EducationEntry,
  ExperienceEntry,
  LanguageEntry,
  Pillar,
  PublicationEntry,
  SkillGroup,
} from "./types";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Elemento #app não encontrado.");
}

const linkOrSpan = (item: ContactItem) =>
  item.href
    ? `<a href="${item.href}" target="_blank" rel="noreferrer">${item.value}</a>`
    : `<span>${item.value}</span>`;

const renderContact = (item: ContactItem) => `
  <li class="meta-list__item">
    <span class="meta-list__label">${item.label}</span>
    ${linkOrSpan(item)}
  </li>
`;

const renderMetric = (metric: { value: string; label: string }) => `
  <li class="metric">
    <strong>${metric.value}</strong>
    <span>${metric.label}</span>
  </li>
`;

const renderPrintMetric = (metric: { value: string; label: string }) => `
  <li class="print-metric">
    <strong>${metric.value}</strong>
    <span>${metric.label}</span>
  </li>
`;

const renderPillar = (pillar: Pillar) => `
  <article class="insight-card">
    <h3>${pillar.title}</h3>
    <p>${pillar.body}</p>
  </article>
`;

const renderSkillGroup = (group: SkillGroup) => `
  <article class="stack-group">
    <h3>${group.title}</h3>
    <ul>
      ${group.items.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  </article>
`;

const renderLanguage = (language: LanguageEntry) => `
  <li class="language-item">
    <div>
      <strong>${language.name}</strong>
      <span>${language.level}</span>
    </div>
    ${language.note ? `<small>${language.note}</small>` : ""}
  </li>
`;

const renderExperience = (entry: ExperienceEntry) => `
  <article class="timeline-card">
    <div class="timeline-card__marker" aria-hidden="true"></div>
    <div class="timeline-card__body">
      <p class="eyebrow">${entry.period}</p>
      <h3>${entry.role}</h3>
      <p class="timeline-card__meta">${entry.company} · ${entry.location}</p>
      <p class="timeline-card__summary">${entry.summary}</p>
      <ul class="timeline-card__highlights">
        ${entry.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
      </ul>
      ${
        entry.stack?.length
          ? `
            <p class="timeline-card__stack">
              <span>Base de atuação:</span> ${entry.stack.join(" · ")}
            </p>
          `
          : ""
      }
    </div>
  </article>
`;

const renderEducation = (item: EducationEntry) => `
  <li class="compact-list__item">
    <strong>${item.title}</strong>
    <span>${item.institution}</span>
    <small>${item.period}${item.note ? ` · ${item.note}` : ""}</small>
  </li>
`;

const renderPublication = (publication: PublicationEntry) => `
  <li class="compact-list__item">
    <strong>${publication.title}</strong>
    <span>${publication.detail}</span>
    ${
      publication.href
        ? `<a href="${publication.href}" target="_blank" rel="noreferrer">${publication.href}</a>`
        : ""
    }
  </li>
`;

const renderOverviewCard = (title: string, body: string) => `
  <article class="overview-card">
    <h3>${title}</h3>
    <p>${body}</p>
  </article>
`;

const renderPrintExperience = (entry: ExperienceEntry) => `
  <article class="print-entry">
    <p class="print-entry__period">${entry.period}</p>
    <h3>${entry.role}</h3>
    <p class="print-entry__meta">${entry.company} · ${entry.location}</p>
    <p class="print-entry__summary">${entry.printSummary ?? entry.summary}</p>
    <ul class="print-entry__list">
      ${(entry.printHighlights ?? entry.highlights.slice(0, 2))
        .map((item) => `<li>${item}</li>`)
        .join("")}
    </ul>
  </article>
`;

const renderPrintPillar = (pillar: Pillar) => `
  <li class="print-bullet-list__item">
    <strong>${pillar.title}.</strong> ${pillar.body}
  </li>
`;

const renderInlineSkillGroup = (group: SkillGroup) => `
  <article class="print-inline-group">
    <h3>${group.title}</h3>
    <div class="print-chip-row">
      ${group.items.map((item) => `<span>${item}</span>`).join("")}
    </div>
  </article>
`;

app.innerHTML = `
  <div class="page-shell">
    <div class="page-noise" aria-hidden="true"></div>
    <main class="resume">
      <aside class="profile-rail card">
        <div class="profile-rail__photo-wrap">
          <img src="${cvPtBr.identity.photo}" alt="Foto de ${cvPtBr.identity.name}" class="profile-rail__photo" />
        </div>
        <div class="profile-rail__identity">
          <h1>${cvPtBr.identity.name}</h1>
          <h2>${cvPtBr.identity.title}</h2>
          ${
            cvPtBr.identity.secondaryTitle
              ? `<p class="profile-rail__secondary">${cvPtBr.identity.secondaryTitle}</p>`
              : ""
          }
          <p class="profile-rail__subtitle">${cvPtBr.identity.subtitle}</p>
        </div>

        <section class="profile-rail__section">
          <ul class="meta-list">
            ${cvPtBr.contacts.map(renderContact).join("")}
          </ul>
        </section>

        <section class="profile-rail__section">
          <p class="eyebrow">Indicadores</p>
          <ul class="metrics metrics--rail">
            ${cvPtBr.metrics.map(renderMetric).join("")}
          </ul>
        </section>

        <section class="profile-rail__section">
          <p class="eyebrow">Idiomas</p>
          <ul class="language-list">
            ${cvPtBr.languages.map(renderLanguage).join("")}
          </ul>
        </section>
      </aside>

      <div class="resume__content">
        <div class="resume__layout">
          <div class="resume__primary">
            <header class="hero card">
              <div class="hero__content">
                <h2>${cvPtBr.identity.title}${cvPtBr.identity.secondaryTitle ? ` · ${cvPtBr.identity.secondaryTitle}` : ""}</h2>
                <p class="hero__subtitle">${cvPtBr.identity.summary}</p>
                <p class="hero__availability">${cvPtBr.identity.availability}</p>
              </div>
            </header>

            <section class="section section--experience card">
              <div class="section__header">
                <p class="eyebrow">Experiência</p>
                <h2>Timeline de liderança, operação e escala</h2>
              </div>
              <div class="timeline">
                ${cvPtBr.experience.map(renderExperience).join("")}
              </div>
            </section>
          </div>

          <aside class="resume__secondary">
            <section class="overview-grid overview-grid--stacked">
              ${renderOverviewCard("Escala de times", "Construção e evolução de times offshore com contexto claro, recrutamento criterioso e alinhamento entre pessoas, arquitetura e entrega.")}
              ${renderOverviewCard("Parceria Brasil-EUA", "Atuação contínua com clientes internacionais, conectando stakeholders, cultura, operação e execução técnica em times distribuídos.")}
              ${renderOverviewCard("Visão mais estratégica", "Base técnica sólida com participação crescente em processos, organização, apoio comercial e decisões de maior impacto para o negócio.")}
            </section>

            <section class="section card section--compact">
              <div class="section__header">
                <p class="eyebrow">Liderança e gestão</p>
                <h2>Como atua na formação e na sustentação de times</h2>
              </div>
              <div class="insight-grid insight-grid--tight">
                ${cvPtBr.leadershipPillars.map(renderPillar).join("")}
              </div>
            </section>

            <section class="section card section--compact">
              <div class="section__header">
                <p class="eyebrow">IA e produtividade</p>
                <h2>Aceleração aplicada com ferramentas e automação</h2>
              </div>
              <div class="insight-grid insight-grid--tight">
                ${cvPtBr.aiProductivity.map(renderPillar).join("")}
              </div>
            </section>

            <section class="section card section--compact">
              <div class="section__header">
                <p class="eyebrow">Competências técnicas</p>
                <h2>Base atual de atuação</h2>
              </div>
              <div class="stack-groups">
                ${cvPtBr.skillGroups.map(renderSkillGroup).join("")}
              </div>
            </section>

            <section class="section card section--compact">
              <div class="section__header">
                <p class="eyebrow">Formação</p>
                <h2>Fundamentos</h2>
              </div>
              <ul class="compact-list">
                ${cvPtBr.education.map(renderEducation).join("")}
              </ul>
            </section>

            <section class="section card section--compact">
              <div class="section__header">
                <p class="eyebrow">Publicação</p>
                <h2>Reconhecimento</h2>
              </div>
              <ul class="compact-list">
                ${cvPtBr.publications.map(renderPublication).join("")}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>

    <section class="print-resume" aria-hidden="true">
      <article class="print-page">
        <header class="print-hero">
          <img src="${cvPtBr.identity.photo}" alt="Foto de ${cvPtBr.identity.name}" class="print-hero__photo" />
          <div class="print-hero__content">
            <h1>${cvPtBr.identity.name}</h1>
            <h2>${cvPtBr.identity.title}</h2>
            ${
              cvPtBr.identity.secondaryTitle
                ? `<p class="print-hero__secondary">${cvPtBr.identity.secondaryTitle}</p>`
                : ""
            }
            <p class="print-copy print-copy--lead">${cvPtBr.identity.subtitle}</p>
            <p class="print-copy">${cvPtBr.identity.summary}</p>
          </div>
        </header>

        <div class="print-page__summary">
          <section class="print-block">
            <p class="eyebrow">Posicionamento</p>
            <h2>${cvPtBr.identity.availability}</h2>
          </section>

          <section class="print-block">
            <p class="eyebrow">Contato</p>
            <ul class="print-contact-list">
              ${cvPtBr.contacts.map(renderContact).join("")}
            </ul>
          </section>

          <section class="print-block">
            <p class="eyebrow">Indicadores e idiomas</p>
            <ul class="print-metric-list">
              ${cvPtBr.metrics.map(renderPrintMetric).join("")}
            </ul>
            <ul class="print-plain-list print-plain-list--compact">
              ${cvPtBr.languages
                .map(
                  (item) =>
                    `<li><strong>${item.name}</strong> · ${item.level}${item.note ? ` · ${item.note}` : ""}</li>`,
                )
                .join("")}
            </ul>
          </section>
        </div>

        <section class="print-block print-block--experience">
          <p class="eyebrow">Experiência</p>
          <h2>Trajetória executiva e liderança técnica</h2>
          <div class="print-entry-grid">
            ${cvPtBr.experience.map(renderPrintExperience).join("")}
          </div>
        </section>
      </article>

      <article class="print-page">
        <div class="print-page__grid print-page__grid--support">
          <section class="print-block">
            <p class="eyebrow">Liderança e gestão</p>
            <h2>Como atua na formação e na sustentação de times</h2>
            <ul class="print-bullet-list">
              ${cvPtBr.leadershipPillars.map(renderPrintPillar).join("")}
            </ul>
          </section>

          <section class="print-block">
            <p class="eyebrow">IA e produtividade</p>
            <h2>Aceleração aplicada com ferramentas e automação</h2>
            <ul class="print-bullet-list">
              ${cvPtBr.aiProductivity.map(renderPrintPillar).join("")}
            </ul>
          </section>

          <section class="print-block print-block--span">
            <p class="eyebrow">Competências técnicas</p>
            <h2>Base atual de atuação</h2>
            <div class="print-inline-groups">
              ${cvPtBr.skillGroups.map(renderInlineSkillGroup).join("")}
            </div>
          </section>

          <section class="print-block">
            <p class="eyebrow">Formação</p>
            <h2>Fundamentos</h2>
            <ul class="print-plain-list">
              ${cvPtBr.education
                .map(
                  (item) =>
                    `<li><strong>${item.title}</strong> · ${item.institution} · ${item.period}</li>`,
                )
                .join("")}
            </ul>
          </section>

          <section class="print-block">
            <p class="eyebrow">Publicação</p>
            <h2>Reconhecimento</h2>
            <ul class="print-plain-list">
              ${cvPtBr.publications
                .map(
                  (item) =>
                    `<li><strong>${item.title}</strong> · ${item.detail}</li>`,
                )
                .join("")}
            </ul>
          </section>
        </div>
      </article>
    </section>
  </div>
`;
