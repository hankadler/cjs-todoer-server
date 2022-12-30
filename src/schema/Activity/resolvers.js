/* eslint-disable no-param-reassign */

const resolvers = {
  Query: {
    activities: async (parent, args, { Activity }) => {
      const activities = await Activity.find();
      activities.sort((a, b) => a.index - b.index);
      return activities;
    },

    activity: async (parent, { activityId }, { Activity }) => Activity.findById(activityId)
  },

  Mutation: {
    createActivity: async (parent, { input }, { Activity }) => {
      try {
        const activities = await Activity.find();
        const index = activities.length;
        const activity = await Activity.create({ ...input, index });
        return { success: true, activity };
      } catch ({ message }) {
        return { success: false, message };
      }
    },

    updateActivity: async (parent, { activityId, input }, { Activity }) => {
      if (!activityId) return { success: false, message: "Empty activityId!" };
      const activity = await Activity.findByIdAndUpdate(activityId, input);
      if (!activity) {
        return { success: false, message: "Could not find activity with that id! ", activity };
      }
      return { success: true, activity };
    },

    swapActivityIndexes: async (parent, { indexA, indexB }, { Activity }) => {
      try {
        const activities = await Activity.find();
        if (indexA === indexB) return { success: true, activities };

        const { _id: activityIdA } = activities.find((activity) => activity.index === indexA);
        const { _id: activityIdB } = activities.find((activity) => activity.index === indexB);

        await Activity.findByIdAndUpdate(activityIdA, { index: indexB + activities.length });
        await Activity.findByIdAndUpdate(activityIdB, { index: indexA });
        await Activity.findByIdAndUpdate(activityIdA, { index: indexB });

        return { success: true, activities: await Activity.find() };
      } catch ({ message }) {
        return { success: false, message };
      }
    },

    compressActivityIndexes: async (parent, args, { Activity }) => {
      try {
        let activities = await Activity.find();
        activities = await Promise.all(
          activities.map(({ _id }, i) => Activity.findByIdAndUpdate(_id, { index: i }))
        );
        return { success: true, activities };
      } catch ({ message }) {
        return { success: false, message };
      }
    },

    deleteActivities: async (parent, args, { Activity }) => {
      const { deletedCount } = await Activity.deleteMany();
      return { success: true, message: `Deleted ${deletedCount} activities.` };
    },

    deleteActivity: async (parent, { activityId }, { Activity }) => {
      if (!activityId) return { success: false, message: "Empty activityId!" };
      const response = await Activity.findByIdAndDelete(activityId);
      return { success: true, message: `Deleted ${response ? 1 : 0} activity.` };
    }
  }
};

module.exports = resolvers;
