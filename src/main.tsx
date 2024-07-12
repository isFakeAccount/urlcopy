import { Devvit } from '@devvit/public-api';

Devvit.configure({ redditAPI: true });

const urlCopyPost = Devvit.createForm(
  (data) => {
    return {
      fields: [
        {
          name: "copyLink",
          label: "Copy Link",
          type: "string",
          defaultValue: data.copyLink,
        },
        {
          name: "copyMd",
          label: `Copy Markdown`,
          type: "string",
          defaultValue: data.copyMd,
        },
        {
          name: "copyTitle",
          label: `Copy Title`,
          type: "string",
          defaultValue: data.copyTitle,
        },
        {
          name: "copyUsername",
          label: `Copy Username`,
          type: "string",
          defaultValue: data.copyUsername,
        },
      ],
      title: `Copy Submission URL`,
    };
  },
  async (_) => { }
);

interface SubmissionData {
  copyLink: string;
  copyMd: string;
  copyTitle: string;
  copyUsername: string;
}

Devvit.addMenuItem({
  location: 'post',
  label: 'URL Copy',
  onPress: async (event, context) => {

    const post = context.reddit.getPostById(event.targetId);
    const postUrl = `https://reddit.com${(await post).permalink}`

    const submissionData: SubmissionData = {
      copyLink: postUrl,
      copyMd: `[${(await post).title}](${postUrl})`,
      copyTitle: (await post).title,
      copyUsername: (await post).authorName,
    }
    return context.ui.showForm(urlCopyPost, submissionData)
  },
});


const urlCopyComment = Devvit.createForm(
  (data) => {
    return {
      fields: [
        {
          name: "copyLink",
          label: "Copy Link",
          type: "string",
          defaultValue: data.copyLink,
        },
        {
          name: "copyUsername",
          label: `Copy Username`,
          type: "string",
          defaultValue: data.copyUsername,
        },
      ],
      title: `Copy Submission URL`,
    };
  },
  async (_) => { }
);

interface CommentData {
  copyLink: string;
  copyUsername: string;
}

Devvit.addMenuItem({
  location: 'comment',
  label: 'URL Copy',
  onPress: async (event, context) => {
    const comment = context.reddit.getCommentById(event.targetId);
    const commentUrl = `https://reddit.com${(await comment).permalink}`

    const commentData: CommentData = {
      copyLink: commentUrl,
      copyUsername: (await comment).authorName,
    }

    return context.ui.showForm(urlCopyComment, commentData)
  },
});

export default Devvit;
