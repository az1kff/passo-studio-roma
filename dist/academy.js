// Keep the original lesson and question IDs compatible with saved progress.
Object.assign(COURSE.sources, ATLAS.sources);
for (const lesson of COURSE.lessons) Object.assign(lesson, ATLAS.extensions[lesson.id]);

for (const article of ATLAS.added) {
  const vocabulary = article.terms.map((term, index) => ({
    id: article.id + "-v" + (index + 1),
    ask: term.def + " Qual è il termine corretto?",
    choices: [term.it, ...article.terms.filter(other => other !== term).map(other => other.it)],
    why: term.it + " — " + term.ru + ". " + term.def
  }));
  const exercises = PRACTICE.applied.filter(q => q.lesson === article.id)
    .map((q, i) => ({ ...q, id: article.id + "-a" + (i + 1) }));
  const mixed = [vocabulary[0], exercises[0], vocabulary[1], vocabulary[2], exercises[1], vocabulary[3]];
  COURSE.lessons.push({ ...article, word: article.terms[0].it,
    translation: article.terms[0].ru, questions: mixed });
}
