import jsPDF from "jspdf";

export const generatePDF = (stagiaire, template = "modern") => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;

  // Colors - OFPPT/ISTA brand colors
  const primaryColor = [0, 102, 204]; // Blue
  const secondaryColor = [255, 102, 0]; // Orange
  const textColor = [51, 51, 51]; // Dark gray

  // Header with ISTA branding
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("CURRICULUM VITAE", pageWidth / 2, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    "OFPPT - Institut Spécialisé de Technologie Appliquée",
    pageWidth / 2,
    30,
    { align: "center" }
  );

  let yPos = 50;

  // Personal Information
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(`${stagiaire.prenom} ${stagiaire.nom}`, margin, yPos);

  yPos += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(stagiaire.filiere, margin, yPos);

  yPos += 15;

  // Contact section
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.rect(margin, yPos - 5, 5, 5, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("COORDONNÉES", margin + 8, yPos);

  yPos += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`📧 ${stagiaire.email}`, margin, yPos);
  yPos += 6;
  doc.text(`📱 ${stagiaire.telephone}`, margin, yPos);
  yPos += 6;
  doc.text(`📍 ${stagiaire.adresse}`, margin, yPos);
  yPos += 6;
  doc.text(
    `🎂 ${new Date(stagiaire.dateNaissance).toLocaleDateString("fr-FR")}`,
    margin,
    yPos
  );

  yPos += 15;

  // Formation
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.rect(margin, yPos - 5, 5, 5, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("FORMATION", margin + 8, yPos);

  yPos += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`${stagiaire.filiere}`, margin, yPos);
  yPos += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Promotion ${stagiaire.anneePromotion} - ISTA/OFPPT`, margin, yPos);
  yPos += 6;
  doc.text(`Baccalauréat: ${stagiaire.diplomeBac}`, margin, yPos);

  yPos += 15;

  // Experience
  if (stagiaire.experiences.length > 0) {
    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.rect(margin, yPos - 5, 5, 5, "F");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("EXPÉRIENCE PROFESSIONNELLE", margin + 8, yPos);

    yPos += 8;
    stagiaire.experiences.forEach((exp) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${exp.poste} - ${exp.entreprise}`, margin, yPos);
      yPos += 6;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.text(`${exp.dateDebut} - ${exp.dateFin}`, margin, yPos);
      yPos += 6;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      exp.missions.forEach((mission) => {
        const lines = doc.splitTextToSize(
          `• ${mission}`,
          pageWidth - 2 * margin
        );
        doc.text(lines, margin + 3, yPos);
        yPos += 5 * lines.length;
      });
      yPos += 5;
    });
  }

  yPos += 5;

  // Competences
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.rect(margin, yPos - 5, 5, 5, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("COMPÉTENCES", margin + 8, yPos);

  yPos += 8;

  if (stagiaire.competencesTechniques.length > 0) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Compétences Techniques:", margin, yPos);
    yPos += 6;
    doc.setFont("helvetica", "normal");
    const techSkills = stagiaire.competencesTechniques.join(" • ");
    const techLines = doc.splitTextToSize(techSkills, pageWidth - 2 * margin);
    doc.text(techLines, margin, yPos);
    yPos += 5 * techLines.length + 5;
  }

  if (stagiaire.softSkills.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.text("Soft Skills:", margin, yPos);
    yPos += 6;
    doc.setFont("helvetica", "normal");
    const softSkills = stagiaire.softSkills.join(" • ");
    const softLines = doc.splitTextToSize(softSkills, pageWidth - 2 * margin);
    doc.text(softLines, margin, yPos);
    yPos += 5 * softLines.length + 5;
  }

  // Langues
  if (stagiaire.langues.length > 0) {
    yPos += 5;
    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.rect(margin, yPos - 5, 5, 5, "F");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("LANGUES", margin + 8, yPos);

    yPos += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    stagiaire.langues.forEach((langue) => {
      doc.text(`${langue.langue}: ${langue.niveau}`, margin, yPos);
      yPos += 6;
    });
  }

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "Document généré par le système de gestion CV - ISTA/OFPPT",
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 10,
    { align: "center" }
  );

  // Save the PDF
  doc.save(`CV_${stagiaire.nom}_${stagiaire.prenom}.pdf`);
};
