<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="row q-col-gutter-md">

      <!-- ฝั่งซ้าย: ปุ่มเรียก API -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section class="bg-primary text-white">
            <div class="text-subtitle1 text-weight-medium">HTTP Methods</div>
          </q-card-section>
          <q-list separator>
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-blue"> 1. GET:List ALL </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="blue"
                  label="Fetch All"
                  @click="handleFetchAll"
                  :loading="isLoading"
                ></q-btn>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-blue">
                  2. Create: ID:101
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="green"
                  label="CreateNewpost"
                  @click="handleCreate"
                  :loading="isLoading"
                ></q-btn>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-blue">
                  3. Update: ID:1
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="orange"
                  label="UpdatePost"
                  @click="handleUpdate"
                  :loading="isLoading"
                ></q-btn>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-blue">
                  4. Delete: ID:1
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="red"
                  label="DeletePost"
                  @click="handleDelete"
                  :loading="isLoading"
                ></q-btn>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-blue">
                  5. Filter: userId 1
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="purple"
                  label="FilterPost"
                  @click="handleFilter"
                  :loading="isLoading"
                ></q-btn>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-blue">
                  6. Comments: post 1
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="teal"
                  label="Comments"
                  @click="handleComments"
                ></q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <div class="col-12 col-md-7">
        <q-card flat bordered>
          <q-card-section class="bg-grey-9 text-white row justify-between items-center q-py-xs">
            <div class="text-subtitle2">
              <q-icon name="terminal"></q-icon>
              Live Data
            </div>
            <div class="text-caption text-grey-5">Total: {{ postItem.length }} records</div>
          </q-card-section>

          <q-card-section v-if="isLoading" class="text-center q-pa-xl">
            <q-spinner-matrix color="primary" size="3rem"></q-spinner-matrix>
            <div class="q-mt-sm text-grey-6">Syncing data with server...</div>
          </q-card-section>

          <q-card-section v-else>
            <!-- ส่วนแสดง comments -->
            <div v-if="comments.length > 0" class="q-mb-md">
              <q-banner dense class="bg-teal-9 text-white rounded-borders q-mb-sm">
                <q-icon name="comment"></q-icon>
                Comment of Post ID: 1
                <template v-slot:action>
                  <q-btn flat label="Close Comment" color="white" @click="comments = []"></q-btn>
                </template>
              </q-banner>
              <q-list bordered separator class="bg-white rounded-borders">
                <q-item v-for="com in comments" :key="com.id">
                  <q-item-section>
                    <q-item-label class="text-weight-bold">
                      {{ com.name }} ({{ com.email }})
                    </q-item-label>
                    <q-item-label caption>{{ com.body }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div v-if="postItem.length == 0" class="text-center q-pa-xl text-grey-5">
              <q-icon name="layers_clear" size="4rem"></q-icon>
              <div class="text-h6 q-mt-sm">No Data</div>
            </div>
            <div v-else class="row q-col-gutter-sm">
              <div v-for="item in postItem.slice(0, 6)" :key="item.id" class="col-12 col-sm-6">
                <q-card flat bordered class="bg-white text-dark">
                  <q-card-section class="q-pa-sm">
                    <q-badge :color="item.id > 100 ? 'green' : 'blue'" class="q-mb-xs"
                      >ID:{{ item.id }}</q-badge
                    >
                    <q-badge color="purple" class="q-ml-xs q-mb-xs">
                      User: {{ item.userId }}
                    </q-badge>
                    <div class="text-weight-bold text-subtitle2">{{ item.title }}</div>
                    <div class="text-caption text-grey-7 q-mt-xs">{{ item.body }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { usePostStore } from '@/stores/post-stores'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
const $q = useQuasar()
const store = usePostStore()
const { postItem, isLoading } = storeToRefs(store)
const comments = ref([])

const handleFetchAll = async () => {
  await store.fetchAllPosts()
  $q.notify({
    type: 'positive',
    message: 'Data fetched success',
    position: 'bottom-right',
  })
}

const handleCreate = async () => {
  const newPostData = {
    title: 'New Post',
    body: 'body of new post',
    userId: 999,
  }
  await store.createNewPost(newPostData)
  $q.notify({
    type: 'positive',
    message: 'Data created success',
    icon: 'cloud_done',
  })
}

const handleUpdate = async () => {
  const updateData = {
    id: 1,
    title: 'Update post2',
    body: 'body of new post2',
    userId: 900,
  }
  await store.updatePost(1, updateData)
  $q.notify({
    type: 'positive',
    message: 'Data updated success',
    icon: 'sync',
  })
}

const handleDelete = async () => {
  await store.deletePost(1)
  $q.notify({
    type: 'negative',
    message: 'Data deleted success',
    icon: 'delete',
  })
}

const handleFilter = async () => {
  const userId = 1
  comments.value = []
  await store.filterPost(userId)
  $q.notify({
    color: 'purple',
    textColor: 'white',
    message: `Filter userId : ${userId} success`,
    icon: 'filter_list',
  })
}

const handleComments = async () => {
  const id = 1
  const commentsList = await store.fetchComment(id)
  if (commentsList) {
    comments.value = commentsList
    $q.notify({
      type: 'positive',
      message: `Comment of post id : ${id} success`,
      icon: 'comment',
    })
  }
}
</script>