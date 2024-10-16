import 'instantsearch.css/themes/satellite.css';
import { algoliasearch, type Hit } from 'algoliasearch';
import { Configure, Highlight, Hits, InstantSearch, Pagination, RefinementList, SearchBox } from 'react-instantsearch';

const searchClient = algoliasearch('RKWFGF56LZ', '9f7c9e14f3c9c720be077572ded89fbd', {
  
});

type HitEntity = {
  name: string;
  description: string;
  genres?: string[];
  posters: [
    {
      url: string;
    }
  ]
}

function HitRender({ hit }: {hit: Hit<HitEntity>}) {
  return (
    <div className='flex gap-2 mb-2'>
      <img className='size-[50px] rounded-lg shrink-0' src={hit.posters[0]?.url} alt={hit.name} />
      <div className='grid gap-1'>
        <Highlight attribute="name" hit={hit} />
        <div>
          <p className='line-clamp-2 text-xs'>${hit.description}</p>
          <p className='text-xs'>{hit.genres?.join(',')}</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className='w-[600px] max-w-[100%] mx-auto mt-[150px]'>

    <InstantSearch searchClient={searchClient} indexName="titles-example">
      <Configure hitsPerPage={5} />
      <SearchBox />
      <div className='flex gap-2 my-2'>
        <div>
          <h2 className='text-sm'>Genres</h2>
          <RefinementList attribute="genres" title='Genres' / >
        </div>
        <div>
          <h2 className='text-sm'>Company</h2>
          <RefinementList attribute="company.name" title="Company" />
        </div>
      </div>
      <Hits hitComponent={HitRender} />
      <Pagination />
    </InstantSearch>
    </div>
  );
}

export default App;