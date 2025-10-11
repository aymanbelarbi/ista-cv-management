import { Mail, Phone, MapPin, User, GraduationCap, Briefcase, Star, Languages } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CVPreview = ({ formData }) => {
  const { 
    nom, prenom, email, telephone, adresse, photo, 
    filiere, anneePromotion, diplomeBac,
    experiences,
    competencesTechniques, softSkills, langues
  } = formData;

  return (
    <Card>
       <CardHeader className="bg-primary text-primary-foreground p-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 rounded-t-lg">
        {photo ? (
          <img src={photo} alt="Profile" className="w-32 h-32 rounded-full border-4 border-primary-foreground/20 object-cover" />
        ) : (
          <div className="w-32 h-32 rounded-full bg-primary-foreground/10 flex items-center justify-center border-4 border-primary-foreground/20">
            <User className="w-16 h-16 text-primary-foreground/50" />
          </div>
        )}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{prenom || ""} {nom || ""}</h1>
          <p className="text-xl text-primary-foreground/80 mt-1">{filiere || ""}</p>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            {(email || telephone || adresse) && (
              <Section title="Contact" icon={<Mail className="w-5 h-5" />}>
                <ContactInfo icon={<Mail className="w-4 h-4" />} text={email} />
                <ContactInfo icon={<Phone className="w-4 h-4" />} text={telephone} />
                <ContactInfo icon={<MapPin className="w-4 h-4" />} text={adresse} />
              </Section>
            )}

            {(filiere || anneePromotion || diplomeBac) && (
              <Section title="Formation" icon={<GraduationCap className="w-5 h-5" />}>
                <p className="font-semibold text-foreground">{filiere}</p>
                <p className="text-sm text-muted-foreground">Promotion {anneePromotion}</p>
                <p className="mt-2 text-sm">{diplomeBac}</p>
              </Section>
            )}

            {(competencesTechniques?.length > 0 || softSkills?.length > 0) && (
              <Section title="Compétences" icon={<Star className="w-5 h-5" />}>
                <SkillList title="Techniques" skills={competencesTechniques} />
                <SkillList title="Soft Skills" skills={softSkills} />
              </Section>
            )}

            {langues?.length > 0 && (
              <Section title="Langues" icon={<Languages className="w-5 h-5" />}>
                {langues.map((lang, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-foreground">{lang.langue}</span>
                    <span className="text-muted-foreground font-medium">{lang.niveau}</span>
                  </div>
                ))}
              </Section>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            {experiences && experiences.length > 0 && (
              <Section title="Expériences" icon={<Briefcase className="w-5 h-5" />}>
                {experiences.map((exp, index) => (
                  <div key={index} className={index > 0 ? "pt-4 border-t" : ""}>
                    <h3 className="text-md font-semibold text-foreground">{exp.poste}</h3>
                    <p className="font-medium text-muted-foreground text-sm">{exp.entreprise}</p>
                    <p className="text-xs text-muted-foreground/80 mb-2">{exp.dateDebut} - {exp.dateFin}</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {exp.missions?.map((mission, i) => (
                        <li key={i}>{mission}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Section>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Section = ({ title, icon, children }) => (
  <div>
    <h2 className="text-xl font-bold text-foreground border-b-2 border-border pb-2 mb-4 flex items-center space-x-2">
      {icon}
      <span>{title}</span>
    </h2>
    <div className="space-y-2">
      {children}
    </div>
  </div>
);

const ContactInfo = ({ icon, text }) => (
  text && (
    <div className="flex items-center space-x-2 text-sm">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-foreground">{text}</span>
    </div>
  )
);

const SkillList = ({ title, skills }) => (
  skills?.length > 0 && (
    <div>
      <h4 className="font-semibold text-sm mb-2 text-foreground">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span key={index} className="bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
);

export default CVPreview;
