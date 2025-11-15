import { portfolio } from "./portfolio";

const BUCKET_NAME = "ae9245dd-025a-4622-813e-f60500e3e004";
const REGION = "us-east-2";
const S3_BASE_URL = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com`;

export type Category =
  | "todos"
  | "aniversario"
  | "casamentos"
  | "eventos"
  | "familia"
  | "gestantes"
  | "nascimento";

export interface PortfolioItem {
  id: string;
  category: Category;
  imageUrl: string;
}

// Mapeamento de pastas do S3 para categorias
const folderToCategoryMap: Record<string, Category> = {
  aniversario: "aniversario",
  casamentos: "casamentos",
  eventos: "eventos",
  familia: "familia",
  gestantes: "gestantes",
  nascimento: "nascimento",
};

/**
 * Lista todos os objetos do bucket S3
 */
async function listS3Objects(): Promise<string[]> {
  try {
    const response = await fetch(
      `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/?list-type=2`
    );

    if (!response.ok) {
      console.error("Erro ao listar objetos do S3:", response.statusText);
      return [];
    }

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const keys: string[] = [];
    const contents = xmlDoc.getElementsByTagName("Contents");

    for (let i = 0; i < contents.length; i++) {
      const keyElement = contents[i].getElementsByTagName("Key")[0];
      if (keyElement) {
        keys.push(keyElement.textContent || "");
      }
    }

    return keys;
  } catch (error) {
    console.error("Erro ao buscar imagens do S3:", error);
    return [];
  }
}

/**
 * Busca todas as imagens do portfólio do S3
 */

/**
 * Busca imagens de uma categoria específica
 */
export async function fetchPortfolioImagesByCategory(
  category: Category
): Promise<PortfolioItem[]> {
  const allItems = await fetchPortfolioImages();

  if (category === "todos") {
    return allItems;
  }

  return allItems.filter(item => item.category === category);
}

export async function fetchPortfolioImages(): Promise<PortfolioItem[]> {
  try {
    // Busca o arquivo portfolio.json do S3
    // const response = await fetch(`${S3_BASE_URL}/portfolio.json`);
    // const response = portfolio;

    // if (!response.ok) {
    //   console.error("Erro ao buscar portfolio.json:", response.statusText);
    //   return [];
    // }

    const data = portfolio;

    // Transforma os dados do JSON em objetos PortfolioItem
    const items: PortfolioItem[] = data.images.map((img: any, index: any) => {
      const category = img.category as Category;
      return {
        id: `${img.category}-${index}`,
        category,
        // Monta a URL completa: bucket/categoria/arquivo.webp
        imageUrl: `${S3_BASE_URL}/${img.category}/${img.filename}`,
      };
    });

    return items;
  } catch (error) {
    console.error("Erro ao buscar imagens do portfólio:", error);
    return [];
  }
}
