import { DataSearch, SelectedFilters } from "@appbaseio/reactivesearch";

function SearchBox() {
  return (
    <>
      <DataSearch
        componentId="searchSensor"
        dataField={["deedName"]}
        queryFormat="and"
        autosuggest={true}
        filterLabel="search"
        placeholder="Type any term"
        URLParams={true}
        customQuery={fullQuery}
        debounce={100}
        react={{
          and: [
            "searchSensor",
            "yearSensor",
            "agentSexSensor",
            "counterAgentSexSensor",
            "agentNameSensor"
          ]
        }}
      />
      <SelectedFilters showClearAll={true} clearAllLabel="Clear filters" />
    </>
  );
}

function fullQuery(value, props) {
  return {
    query: { multi_match: { query: value, type: "cross_fields" } }
  };
}

export default SearchBox;
