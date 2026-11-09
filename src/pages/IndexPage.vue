<template>
  <q-page padding>
    <form @reset="onReset" @submit.prevent="onSubmit" >
      <div class="q-gutter-md">
        <q-input type="text" label="Your username" v-model="username"></q-input>
        <q-input type="email" label="Your email" v-model="email" 
        @keyup.alt.enter="onReset"></q-input>
       <q-select v-model="role" :options="roleOptions" label="Role"></q-select>
        <q-btn color="primary" type="submit"  label="SUBMIT"/>
        <q-btn color="grey" type="reset"  label="RESET" />
      </div>
    </form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const username = ref('')
const email = ref('')
const role = ref(null)
const roleOptions = ['Student', 'Teachar','Staff']
const onReset = () => {
  username.value = ''
  email.value = ''
  role.value = null
}
const onSubmit= () => {
  if(!username.value || !email.value){
    alert("Username or Email is emty")
    return
  }
  console.log("Form was Submitted: ", {
    username: username.value,
    email: email.value
    // role: role.value
  })
  alert("Data Saved")
}
</script>
    <!-- <div v-if="isLogged">Welcome</div>
    <div v-else>Please Login</div> 
    <div v-if="score >= 80">Excellent</div>
    <div v-else-if="score >50">Pass</div>
    <div v-else>Fail</div>
    <div v-show="isVisible">show or Hide</div>
    <q-btn color="primary" :label="isVisible ? 'Hide' :'show'"
    @click="isVisible = !isVisible" />
    ------------------------------------
// import { ref } from 'vue';
// const isVisible =ref(true)
// const isLogged = ref(true);
// const score = ref(80);

  

//  <script setup>
// import { reactive, ref, toRefs } from 'vue'
// const msg = ref(1500)
// console.log(msg.value)
// //arry
// const item = ref(['Apple','Banana', 1100,25.5])
// item.value.push(100)
// console.log(item.value)
// //Object
// const product =ref({
//   id:1,
//   name:"Notebook",
//   price:15000
// })
// console.log(product.value)
// //reactive
// const user = reactive({ name: "jeck", age:20})
// console.log(user.name, user.age)
// const { name, age} =toRefs(user)
// console.log(name.value,age.value)
// </script> -->





