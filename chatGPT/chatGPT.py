import openai

openai.api_key = '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'

prompt = input('input query: ')

resp = openai.Completion.create(
    model = "text-davinci-003",
    prompt = prompt,
    max_tokens=1000
)

print(resp.choices[0])
