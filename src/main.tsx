import { Devvit } from "@devvit/public-api";

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
          name: "copyOldLink",
          label: "Copy Old Reddit Link",
          type: "string",
          defaultValue: data.copyOldLink,
        },
        {
          name: "copyOldMd",
          label: `Copy Old Reddit Markdown`,
          type: "string",
          defaultValue: data.copyOldMd,
        },
        {
          name: "linkedContentUrl",
          label: "Linked Content URL (Relevant if link or media type submission)",
          type: "string",
          defaultValue: data.linkedContentUrl,
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
  async (_) => {}
);

interface SubmissionData {
  [key: string]: string;
  copyLink: string;
  copyMd: string;
  copyOldLink: string;
  copyOldMd: string;
  copyTitle: string;
  copyUsername: string;
  linkedContentUrl: string;
}

Devvit.addMenuItem({
  location: "post",
  label: "URL Copy",
  onPress: async (event, context) => {
    const post = context.reddit.getPostById(event.targetId);
    const postUrl = `https://www.reddit.com${(await post).permalink}`;
    const oldPostUrl = `https://old.reddit.com${(await post).permalink}`;
    

    const submissionData: SubmissionData = {
      copyLink: postUrl,
      copyMd: `[${(await post).title}](${postUrl})`,
      copyOldLink: oldPostUrl,
      copyOldMd: `[${(await post).title}](${oldPostUrl})`,
      linkedContentUrl: (await post).url,
      copyTitle: (await post).title,
      copyUsername: (await post).authorName,
    };
    return context.ui.showForm(urlCopyPost, submissionData);
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
          name: "copyOldLink",
          label: "Copy Old Reddit Link",
          type: "string",
          defaultValue: data.copyOldLink,
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
  async (_) => {}
);
interface CommentData {
  [key: string]: string;
  copyLink: string;
  copyOldLink: string;
  copyUsername: string;
}

Devvit.addMenuItem({
  location: "comment",
  label: "URL Copy",
  onPress: async (event, context) => {
    const comment = context.reddit.getCommentById(event.targetId);
    const commentUrl = `https://www.reddit.com${(await comment).permalink}`;
    const oldCommentUrl = `https://old.reddit.com${(await comment).permalink}`;

    const commentData: CommentData = {
      copyLink: commentUrl,
      copyOldLink: oldCommentUrl,
      copyUsername: (await comment).authorName,
    };

    return context.ui.showForm(urlCopyComment, commentData);
  },
});

export default Devvit;
