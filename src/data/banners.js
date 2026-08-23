// Mapa central de banners. Posts e cursos guardam apenas a chave
// (bannerKey) para que o db.json / backend não precise conhecer o
// caminho dos arquivos gerados pelo bundler.
import reactBanner from "../assets/banners/react.png";
import htmlBanner from "../assets/banners/html.png";
import cssBanner from "../assets/banners/css.png";
import javascriptBanner from "../assets/banners/javascript.png";
import programacaoBanner from "../assets/banners/programacao.png";
import pythonBanner from "../assets/banners/python.png";
import javaBanner from "../assets/banners/java.png";
import mysqlBanner from "../assets/banners/mysql.png";
import nodeBanner from "../assets/banners/node.png";

export const BANNERS = {
  react: reactBanner,
  html: htmlBanner,
  css: cssBanner,
  javascript: javascriptBanner,
  programacao: programacaoBanner,
  python: pythonBanner,
  java: javaBanner,
  mysql: mysqlBanner,
  node: nodeBanner,
};

export const BANNER_OPTIONS = [
  { key: "react", label: "React" },
  { key: "javascript", label: "JavaScript" },
  { key: "html", label: "HTML" },
  { key: "css", label: "CSS" },
  { key: "node", label: "Node.js" },
  { key: "python", label: "Python" },
  { key: "java", label: "Java" },
  { key: "mysql", label: "MySQL" },
  { key: "programacao", label: "Lógica de programação" },
];

// Aceita tanto uma URL/base64 direta quanto uma chave do mapa.
export const resolveBanner = (item) => {
  if (!item) return "";
  if (item.banner) return item.banner;
  if (item.bannerKey && BANNERS[item.bannerKey]) return BANNERS[item.bannerKey];
  return "";
};
