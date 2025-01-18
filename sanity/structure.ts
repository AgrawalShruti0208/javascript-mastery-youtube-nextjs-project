// Here in structure, list of items Sanity provides are listed
import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // adding author schema in the items array 
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('startup').title('Startups'),
      S.documentTypeListItem('playlist').title('Playlists'),
    ]);
