import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';


@Injectable()
export class ChatService {
  private readonly defaultModelName = process.env.MODEL_NAME ?? 'gpt-4o-mini';
  private readonly defaultModelTemperature = Number(process.env.MODEL_TEMPERATURE ?? 0.2);
  
  private readonly model = new ChatOpenAI({
    modelName: this.defaultModelName,
    temperature: this.defaultModelTemperature,
  });

  async ask(prompt: string, temperature?: number): Promise<string> {
    const tmpl = PromptTemplate.fromTemplate(
      `You are a helpful assistant. Be concise and accurate. User: {question}`
    );

  const model =
    typeof temperature === 'number'
      ? new ChatOpenAI({
          modelName: this.defaultModelName,
          temperature,
        })
      : this.model;

    const chain = RunnableSequence.from(
      [tmpl,
       model,
       new StringOutputParser()]);
    
    return chain.invoke({ question: prompt });
  }
}