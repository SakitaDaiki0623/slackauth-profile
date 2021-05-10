<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <a :href="slackAuthUrl"
        ><img
          alt="Sign in with Slack"
          height="40"
          width="172"
          src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
          srcset="
            https://platform.slack-edge.com/img/sign_in_with_slack.png    1x,
            https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x
          "
      /></a>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      slackAuthUrl: `https://slack.com/oauth/v2/authorize?user_scope=identity.basic&client_id=${process.env.VUE_APP_SLACK_CLIENT_ID}`,
    };
  },
};
</script>
