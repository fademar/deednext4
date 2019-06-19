import { DataSearch, SelectedFilters } from "@appbaseio/reactivesearch";
import fetch from "isomorphic-fetch";

function SearchBox(props) {
  const fieldsList = JSON.stringify(props.fields);

  return (
    <>
      <DataSearch
        componentId="searchSensor"
        dataField={[
          "agent.corporationName",
          "agent.familyStatus",
          "agent.firstName",
          "agent.geogrStatus",
          "agent.lastName",
          "agent.names",
          "agent.nbParticipants",
          "agent.patronyme",
          "agent.referentMale.firstName",
          "agent.referentMale.geogrStatus",
          "agent.referentMale.lastName",
          "agent.referentMale.patronyme",
          "agent.referentMale.relatedTo",
          "agent.referentMale.relationshipToAgent",
          "agent.referentMale.socialStatus",
          "agent.relatedTo",
          "agent.socialStatus",
          "agentSex",
          "coAgents.coAgent.familyStatus",
          "coAgents.coAgent.firstName",
          "coAgents.coAgent.geogrStatus",
          "coAgents.coAgent.lastName",
          "coAgents.coAgent.patronyme",
          "coAgents.coAgent.referentMale.firstName",
          "coAgents.coAgent.referentMale.geogrStatus",
          "coAgents.coAgent.referentMale.lastName",
          "coAgents.coAgent.referentMale.patronyme",
          "coAgents.coAgent.referentMale.relatedTo",
          "coAgents.coAgent.referentMale.relationshipToCoAgent",
          "coAgents.coAgent.referentMale.socialStatus",
          "coAgents.coAgent.relatedTo",
          "coAgents.coAgent.socialStatus",
          "coAgents.coAgentSex",
          "coCounterAgents.coCounterAgent.familyStatus",
          "coCounterAgents.coCounterAgent.firstName",
          "coCounterAgents.coCounterAgent.geogrStatus",
          "coCounterAgents.coCounterAgent.lastName",
          "coCounterAgents.coCounterAgent.patronyme",
          "coCounterAgents.coCounterAgent.referentMale.firstName",
          "coCounterAgents.coCounterAgent.referentMale.geogrStatus",
          "coCounterAgents.coCounterAgent.referentMale.lastName",
          "coCounterAgents.coCounterAgent.referentMale.patronyme",
          "coCounterAgents.coCounterAgent.referentMale.relatedTo",
          "coCounterAgents.coCounterAgent.referentMale.relationshipToCoCounterAgent",
          "coCounterAgents.coCounterAgent.referentMale.socialStatus",
          "coCounterAgents.coCounterAgent.relatedTo",
          "coCounterAgents.coCounterAgent.socialStatus",
          "coCounterAgents.coCounterAgentSex",
          "collectiveCoAgent.relationToAgent",
          "collectiveCoAgent.statusesNames",
          "collectiveCoCounterAgent.relationToCounterAgent",
          "collectiveCoCounterAgent.statusesNames"
        ]}
        queryFormat="or"
        autosuggest={true}
        filterLabel="search"
        placeholder="Type any term"
        URLParams={true}
        customQuery={fullQuery}
        debounce={300}
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

SearchBox.getInitialProps = async ({ req }) => {
  const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
  const res = await fetch(`${baseURL}/elasticapi/fields`);

  return {
    fields: await res.json()
  };
};

export default SearchBox;
