import DOMPurify from "dompurify";
// Nettoie toute chaîne destinée à être affichée comme HTML.
export const sanitizeHtml = (html) => DOMPurify.sanitize(String(html ?? ""));
// Échappe les caractères dangereux pour usage en texte brut.
export const escapeText = (str) =>
  String(str ?? "").replace(/[<>&"']/g, (c) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;",
  }[c]));
