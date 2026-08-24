/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import { ArrowUpRight, BookOpen, ChevronDown } from "lucide-react";
import type { LearningProgram } from "@/lib/learning-programs";

type LearningCurriculumProps = {
  program: LearningProgram;
  title: string;
};

export function LearningCurriculum({ program, title }: LearningCurriculumProps) {
  const materialCount = program.modules.reduce((total, module) => total + module.materials.length, 0);

  return (
    <section aria-label={`${title} curriculum`} className="learning-curriculum" data-learning-curriculum>
      <div className="learning-curriculum__intro">
        <div>
          <p className="learning-curriculum__eyebrow">Complete learning journey</p>
          <h2>Curriculum & materials</h2>
        </div>
        <p>{program.summary}</p>
      </div>

      <div aria-label="Program facts" className="learning-curriculum__facts">
        {program.facts.map((fact) => <span key={fact}>{fact}</span>)}
        <span>{materialCount} materials</span>
      </div>

      {program.demos ? (
        <aside aria-label="Connected demos" className="learning-curriculum__demo">
          <div className="learning-curriculum__demo-copy">
            <span aria-hidden="true" className="learning-curriculum__demo-icon"><BookOpen size={20} strokeWidth={1.8} /></span>
            <div>
              <p>Connected build</p>
              <strong>Lumiere Bakery agent</strong>
              <span>A working ordering-agent interface and a plain-English guide to the workflow behind it.</span>
            </div>
          </div>
          <div className="learning-curriculum__demo-actions">
            {program.demos.map((demo) => (
              <a href={demo.href} key={demo.href} rel="noreferrer" target="_blank">
                {demo.label}<ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </aside>
      ) : null}

      <div className="learning-curriculum__modules">
        {program.modules.map((module, index) => (
          <details className="learning-curriculum__module" key={module.code} open={index === 0}>
            <summary>
              <span className="learning-curriculum__module-code">{module.code}</span>
              <span className="learning-curriculum__module-copy">
                <span aria-level={3} className="learning-curriculum__module-title" role="heading">{module.title}</span>
                <span>{module.description}</span>
              </span>
              <span className="learning-curriculum__module-count">{module.materials.length} {module.materials.length === 1 ? "material" : "materials"}</span>
              <ChevronDown aria-hidden="true" className="learning-curriculum__module-chevron" size={22} strokeWidth={1.7} />
            </summary>
            <div className="learning-curriculum__materials">
              {module.materials.map((material) => (
                <a href={material.href} key={material.href} rel="noreferrer" target="_blank">
                  <span>{material.label}</span>
                  <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
