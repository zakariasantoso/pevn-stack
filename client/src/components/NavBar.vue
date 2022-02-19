<template>
  <div>
    <v-app-bar app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Employee Management</v-toolbar-title>
      <v-navigation-drawer height="100vh" dark v-model="drawer" absolute>
        <!-- avatar admin -->
        <v-row justify="center" class="mt-5">
          <v-col cols="7">
            <v-avatar size="100" class="employee-avatar">
              <img src="1.jpg" />
            </v-avatar>
          </v-col>
        </v-row>

        <!-- admin name -->
        <v-row justify="center" class="mt-5">
          <v-col cols="7">
            <h3 class="employee-name">Admin</h3>
          </v-col>
        </v-row>

        <v-list nav dense>
          <v-list-item-group v-model="group">
            <v-list-item v-for="(item, index) in items" :key="index" :to="item.route">
              <!-- untuk icon -->
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <!-- untuk content -->
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      drawer: false,
      group: null,
      items: [
        {
          text: "Home",
          icon: "mdi-home",
          route: "/",
        },
        {
          text: "List Employee",
          icon: "mdi-account-multiple",
          route: "/employee",
        },
        {
          text: "Register Employee",
          icon: "mdi-account-plus",
          route: "/employee/create",
        },
      ],
    };
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
