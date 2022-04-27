from fast_autocomplete import autocomplete_factory
import re
import sys

# load vocab
content_files = {'words': {'filepath': 'words.json','compress': True}}
autocomplete = autocomplete_factory(content_files=content_files)

# process query
query = sys.argv[1]
query = re.sub(r"[^A-Za-z0-9]+", "", query).lstrip().rstrip()

# return at most 5 results
result = autocomplete.search(word=query, max_cost=3, size=5)
result = [item for sublist in result for item in sublist]

# get display name
result_display_name = []
for r in result:
    result_display_name.append(autocomplete.words[r].display)

# return non-duplicated results
print(list(dict.fromkeys(result_display_name)))