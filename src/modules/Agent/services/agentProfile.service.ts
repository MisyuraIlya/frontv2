import axios from 'axios'

interface AgentObjectiveResponse extends Hydra {
  'hydra:member': IAgentObjective[]
}

interface AgentTargetResponse extends Hydra {
  'hydra:member': IAgentTaget[]
}

export const agentProfileService = {
  async getAgentObjective(
    page: string | number,
    type: objectiveTypes,
    search: string,
    agentId: string | null
  ): Promise<AgentObjectiveResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/agent_objectives?page=${page}&objectiveType=${type}&agent.id=${agentId}&client.extId=${search}`
    )
    return response.data
  },
  async createAgentObjective(
    object: IAgentObjective
  ): Promise<IAgentObjective> {
    console.log('object', object)
    if (object.agent) {
      // @ts-ignore
      object.agent = `/api/users/${object.agent.id}`
    }

    if (object.client) {
      // @ts-ignore
      object.client = `/api/users/${object.client.id}`
    }
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/agent_objectives`,
      object
    )
    return response.data
  },
  async updateAgentObjective(
    object: IAgentObjective
  ): Promise<IAgentObjective> {
    // @ts-ignore
    object.agent = `/api/users/${object.agent.id}`
    // @ts-ignore
    object.client = `/api/users/${object.client.id}`
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/api/agent_objectives/${object.id}`,
      object,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )
    return response.data
  },
  async deleteAgentObjective(id: number | string): Promise<void> {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/api/agent_objectives/${id}`
    )
    return response.data
  },

  async getAgentTargets(
    agentId: number | string | null,
    year: string
  ): Promise<AgentTargetResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/agent_targets?agent.id=${agentId}&year=${year}`
    )
    return response.data
  },
  async createAgentTarget(object: IAgentTaget): Promise<IAgentTaget> {
    // @ts-ignore
    object.agent = `/api/users/${object.agent.id}`
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/agent_targets`,
      object
    )
    return response.data
  },
  async updateAgentTarget(object: IAgentTaget): Promise<IAgentTaget> {
    // @ts-ignore
    object.agent = `/api/users/${object.agent.id}`
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/api/agent_targets/${object.id}`,
      object,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )
    return response.data
  },
  async deleteAgentTarget(id: number | string): Promise<void> {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/api/agent_objectives/${id}`
    )
    return response.data
  },
}
