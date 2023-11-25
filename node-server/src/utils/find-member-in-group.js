
const findMemberInGroupMemberList = async (group, memberId) => {
    const member = group.members.find(member => member.toString() === memberId.toString());
    if (member) return { member, collection: "members", subMessage: "already a member" };

    const kickedMember = group.kickedMembers.find(member => member.toString() === memberId.toString());
    if (kickedMember) return { member: kickedMember, collection: "kickedMembers", subMessage: "already kicked" };

    const suspanedMember = group.suspanedMembers.find(member => member.toString() === memberId.toString());
    if (suspanedMember) return { member: suspanedMember, collection: "suspanedMembers", subMessage: "already suspaned" };

    const mutedMember = group.mutedMembers.find(member => member.toString() === memberId.toString());
    if (mutedMember) return { member: mutedMember, collection: "mutedMembers", subMessage: "already muted" };

    return null;
};

module.exports = findMemberInGroupMemberList;