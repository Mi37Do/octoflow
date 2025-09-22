import { faker } from '@faker-js/faker'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectStore = defineStore('project', () => {
  const STATUSES = ['urgent', 'normal', 'low']

  function createParticipant() {
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      position: faker.person.jobTitle(),
    }
  }

  function createTask(pipelines) {
    const participantsCount = faker.number.int({ min: 1, max: 8 })

    const pipeline = faker.helpers.arrayElement(pipelines)
    return {
      id: faker.string.uuid(),
      title: faker.commerce.productName(), // ✅ added title
      description: faker.lorem.sentence(),
      startDate: faker.date.recent({ days: 30 }),
      status: faker.helpers.arrayElement(STATUSES),
      participants: Array.from({ length: participantsCount }, createParticipant),
      pipelineId: pipeline.id,
    }
  }

  function generateTasks(count = 10, pipelines = []) {
    if (!pipelines?.length) {
      console.warn('⚠️ No pipelines provided to generateTasks')
      tasks.value = []
      return []
    }
    tasks.value = Array.from({ length: count }, () => createTask(pipelines))
    return tasks.value
  }

  const tasks = ref([])

  function updateTaskPipeline(taskId, pipelineId) {
    const task = tasks.value.find((t) => t.id === taskId)
    if (task) task.pipelineId = pipelineId

    // optional: sync with API
  }

  return { tasks, generateTasks, updateTaskPipeline }
})
