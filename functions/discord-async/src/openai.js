import OpenAI from 'openai';

export async function generateDailyUpdate(userId, update) {
  const currentDayOfWeek = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
  });

  const systemPrompt = `Here is a format for daily updates:
    🚦 <@${userId}>'s daily update - ${currentDayOfWeek}
    
    🟢 My progress
    - List progress made on tasks
    - \`projectName\` - Progress made
    
    🟡 My plans
    - List short term plans
    
    🔴 My blockers
    - List of blockers
    None
    
    Structure any given daily updates using this format.
    - Avoid rephrasing if possible.
    - Correct obvious grammatical and spelling errors.
    - If no blockers are mentioned, do not include the section.
    - If no plans are mentioned, do not include the section.
    - Do not exagerate or change the meaning of progress points.
    - Output the result only.`;

  const openai = new OpenAI();

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: `Here is a daily update: ${update}`,
      },
    ],
  });

  return completion.choices[0].message.content;
}
