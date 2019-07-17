import { DataSearch, SelectedFilters } from "@appbaseio/reactivesearch";

const SearchBox = props => {
  return (
    <>
      <DataSearch
        componentId="searchSensor"
        dataField={props.fields}
        queryFormat="and"
        autosuggest={true}
        filterLabel="search"
        placeholder="Search for any term..."
        URLParams={true}
        customQuery={fullQuery}
        debounce={300}
        react={{
          and: props.sensors
        }}
      />
      <SelectedFilters showClearAll={true} clearAllLabel="Clear filters" />
    </>
  );
};

const fullQuery = value => {
  return {
    query: {
      multi_match: { query: value, zero_terms_query: "all" }
    }
  };
};

export default SearchBox;
