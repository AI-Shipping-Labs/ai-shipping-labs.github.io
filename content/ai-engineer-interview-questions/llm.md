---
title: "LLM Interview Questions"
description: "A structured set of LLM interview questions with concise previews and expandable answers."
sources:
  - label: "KalyanKS-NLP/LLM-Interview-Questions-and-Answers-Hub (GitHub)"
    url: "https://github.com/KalyanKS-NLP/LLM-Interview-Questions-and-Answers-Hub/tree/main"
  - label: "llmgenai/LLMInterviewQuestions (GitHub)"
    url: "https://github.com/llmgenai/LLMInterviewQuestions/tree/main"
  - label: "Top 36 LLM Interview Questions and Answers for 2026 (DataCamp)"
    url: "https://www.datacamp.com/blog/llm-interview-questions"
  - label: "How-To Prepare for AI LLM Engineer Interview - Commonly Asked Questions and Answers (YouTube)"
    url: "https://www.youtube.com/watch?v=Zt-h5BiBWH0"
  - label: "AI Engineer Interview Questions — What To Ask, What To Say, and What To Look For (YouTube)"
    url: "https://www.youtube.com/watch?v=yr5dRHrnbCo"
  - label: "Interview questions - Gen AI (Reddit)"
    url: "https://www.reddit.com/r/learnmachinelearning/comments/1ppgsf3/interview_questions_gen_ai"
  - label: "Machine Learning Engineer Technical Interview Questions (TryExponent)"
    url: "https://www.tryexponent.com/questions?role=ml-engineer&type=technical"
  - label: "Top 50 LLM Interview Questions by Bhavishya Pandit (LinkedIn)"
    url: "https://www.linkedin.com/posts/bhavishya-pandit_50-llm-interview-questions-activity-7268119633180704769-ur2D/"

sections:
  - id: "llm-fundamentals"
    title: "1. LLM Fundamentals"
    intro: "This section covers the baseline concepts an AI engineer is expected to know before discussing system design or production trade-offs. The questions focus on what large language models are, how they differ from earlier language models, and how core concepts such as tokens, embeddings, and context windows affect real-world LLM behavior."
    qa:
      - question: "1. What is a large language model, and how is it different from traditional statistical language models?"
        answer: |
          A large language model, or LLM, is a neural language model trained on very large text corpora to predict [tokens](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them) in context and to generalize that capability across many downstream tasks such as question answering, summarization, classification, and code generation. Modern LLMs are usually based on the Transformer architecture, which replaced earlier recurrent and convolutional sequence models because it scales better and can model long-range dependencies more effectively.

          Traditional statistical language models, such as n-gram models, estimate the probability of the next token using explicit count-based statistics over short context windows. They are simpler, cheaper, and more interpretable, but they generalize poorly to unseen sequences and do not learn rich contextual representations. LLMs instead learn distributed representations and can condition on much longer contexts, which makes them far more flexible and capable, but also much more computationally expensive to train and serve.

      - question: "2. What is the difference between training and inference in an LLM?"
        answer: |
          Training is the phase in which model parameters are updated. The model is shown large amounts of text, computes a loss such as next-token prediction loss, backpropagates gradients, and uses optimization to change weights so future predictions improve. Training is compute-intensive, usually distributed across many accelerators, and is where the model acquires its general language behavior.

          Inference is the phase in which the trained model is used to produce outputs for new inputs. During inference, the weights are fixed, the input is tokenized, the model computes logits over the vocabulary, and a decoding strategy such as greedy decoding or sampling selects the next token repeatedly until stopping conditions are met. Inference is usually cheaper than training per request, but at scale it is still expensive because latency, memory, and throughput matter.

          A practical way to state the difference in an interview is: training changes the model; inference uses the model. Training optimizes parameters from data. Inference applies those learned parameters to a new prompt.

      - question: "3. What is a token, and why is tokenization necessary in LLMs?"
        answer: |
          A [token](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them) is the basic unit of text that the model processes internally. Depending on the tokenizer and the text, a token may be a whole word, part of a word, punctuation, whitespace-related unit, or even a single character. Modern APIs expose token counts because model input limits, output limits, latency, and cost are all tied to tokens rather than words.

          Tokenization is necessary because neural networks cannot operate directly on raw text strings. The tokenizer converts text into discrete token IDs from a fixed vocabulary, and those IDs are then mapped to vectors that the model can process. Without tokenization, there is no consistent interface between text and the model’s numerical computations.

          Tokenization also affects practical behavior. It influences context length usage, cost, multilingual efficiency, handling of rare terms, and even prompt robustness. The same sentence can produce different token counts depending on the tokenizer and the language.

      - question: "4. Why is subword tokenization preferred over word-level tokenization?"
        answer: |
          [Subword tokenization](https://arxiv.gg/abs/1508.07909) is preferred because natural language is effectively open-vocabulary. New names, typos, domain-specific terms, code identifiers, and morphological variants appear constantly. A word-level vocabulary would either become extremely large and expensive or would produce too many unknown tokens. Subword methods avoid that trade-off by decomposing words into reusable units.

          This gives three major advantages. First, it reduces out-of-vocabulary problems because unseen words can still be represented as sequences of known subwords. Second, it keeps the vocabulary size manageable, which reduces the size of the embedding matrix and output layer. Third, it captures useful regularities across related words, prefixes, suffixes, and compounds.

          The main cost is that tokenization becomes less human-intuitive and long or specialized words may split into many tokens, which increases sequence length. Even so, subword tokenization is usually a better engineering trade-off than word-level tokenization.

      - question: "5. How do LLMs handle out-of-vocabulary words?"
        answer: |
          LLMs usually [handle out-of-vocabulary words by breaking them into known subword pieces](https://arxiv.gg/abs/1508.07909) rather than treating the whole word as a single unknown symbol. That is the practical reason subword methods such as byte-pair encoding became standard in neural language systems.

          For example, a rare technical term, product name, or misspelling may be decomposed into smaller units that the model has seen before. The model may not have memorized the full word, but it can still process its components and often infer meaning from context plus morphology. This is much more robust than older pipelines that relied heavily on a dedicated unknown-word token.

          This does not mean OOV handling is perfect. Rare words that split into many fragments can consume more context window space and may still be interpreted poorly if the model has never seen similar patterns during training. But subword tokenization makes the failure mode much softer than in word-level systems.

      - question: "6. What are embeddings, and what is the role of the embedding layer in an LLM?"
        answer: |
          Embeddings are dense numerical vector representations. In an LLM, the embedding layer maps each token ID to a learned vector in continuous space, so the model can operate on tokens as numerical objects rather than as discrete symbols.

          The embedding layer serves as the model’s input interface. After tokenization turns text into token IDs, the embedding layer converts those IDs into vectors that can be combined with positional information and passed through Transformer blocks. Conceptually, embeddings let the model place related tokens in nearby regions of representation space, which helps it learn semantic and syntactic structure.

          In practice, embeddings are not sufficient on their own because token identity alone does not encode order. That is why LLMs combine token embeddings with positional information such as sinusoidal encodings or rotary positional embeddings before deeper processing.

      - question: "7. What is a context window, and why does it matter?"
        answer: |
          The context window is the maximum number of input tokens the model can take into account at once when producing an output. It defines how much prior text, retrieved information, conversation history, or code the model can condition on in a single pass.

          It matters because it directly limits what the model can “see” for a given request. If relevant information does not fit in the context window, the model cannot use it unless you summarize, retrieve selectively, or split the task into multiple steps. A larger context window can make long-document QA, coding assistance, and conversation memory easier.

          But context length is not only a hard limit. It also affects cost and quality. With Transformer-based models, compute and memory requirements rise as sequence length grows, and empirical work shows that models often do not use all positions equally well, especially [in the middle of long contexts](https://aclanthology.org/2024.tacl-1.9/).

  - id: "transformer-architecture-and-internals"
    title: "2. Transformer architecture and internals"
    intro: "This section focuses on the architecture behind modern LLMs and tests whether a candidate understands more than surface-level terminology. These AI engineer interview questions examine self-attention, positional encoding, encoder and decoder structure, and the internal components of Transformer layers, with an emphasis on explaining how these design choices affect scaling and model capability."
    qa:
      - question: "8. What are the pros and cons of large context windows?"
        answer: |
          The main advantage of a [large context window](https://aclanthology.org/2024.tacl-1.9/) is that it lets the model condition on more information in one interaction. That is useful for long documents, long chats, large codebases, multi-document retrieval, and workflows where preserving raw source material is better than compressing it early.

          The main disadvantages are higher compute cost, higher memory use, more latency, and more opportunity to feed the model irrelevant or noisy content. For Transformer-based systems, longer sequences are especially expensive because attention scales poorly with sequence length.

          There is also a quality caveat. Larger context windows do not guarantee that the model will use all included information effectively. Research on long-context behavior shows that performance often drops when relevant information is placed in the middle of the context, a pattern often called “lost in the middle.” In practice, carefully selected context can outperform simply stuffing the window with more text.

          For an interview, the best balanced answer is: larger context windows expand what the model can condition on, but they do not remove the need for retrieval, compression, ranking, or prompt design. They improve capacity, not perfect utilization.

      - question: "9. What is the Transformer architecture, and why did it replace RNNs and CNNs for most LLM use cases?"
        answer: |
          The [Transformer](https://arxiv.org/pdf/1706.03762) is a neural sequence architecture built around attention rather than recurrence or convolution. In the original design, both the encoder and decoder are stacks of repeated layers composed mainly of multi-head attention and position-wise feed-forward networks, with residual connections and layer normalization around each sublayer.

          It replaced RNNs for most large-scale language modeling because it processes tokens in parallel during training, which makes it much more efficient on modern hardware. RNNs process sequences step by step, which limits parallelism and makes long-range dependency learning harder. Transformers also capture relationships between distant tokens more directly via self-attention rather than through many recurrent steps.

          Compared with CNN-based sequence models, Transformers are more flexible for modeling arbitrary long-range interactions because attention is not tied to a fixed receptive field. That combination of scalability, parallel training, and better handling of long-distance dependencies is the main reason modern LLMs are almost all Transformer-based or closely derived from it.

      - question: "10. Explain self-attention step by step."
        answer: |
          Self-attention lets each token build a context-aware representation by looking at other tokens in the same sequence. In a Transformer layer, the input representations are first projected into three sets of vectors: queries, keys, and values. For a given token, its query is compared against the keys of all tokens to compute relevance scores.

          Those scores are scaled, passed through softmax to become attention weights, and then used to form a weighted sum of the value vectors. The result is a new representation for that token that incorporates information from whichever tokens were most relevant.

          In compact form, scaled dot-product attention is:

          $$ \text{Attention}(Q,K,V)=\text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V $$

          This is the core mechanism that allows Transformers to model dependency structure without recurrence.

      - question: "11. What is the computational complexity of self-attention, and why is it expensive for long sequences?"
        answer: |
          Standard self-attention has quadratic complexity with respect to sequence length because every token attends to every other token. If the sequence length is $n$, the attention matrix has size $n \times n$, so both memory use and a major part of the computation grow on the order of $O(n^2)$.

          This becomes expensive for long contexts because doubling the sequence length roughly quadruples the size of the attention pattern. In practice, that means longer latency, more GPU memory pressure, and higher serving cost.

          That quadratic cost is one of the main reasons long-context LLM inference is hard and why so much research has gone into [efficient](https://arxiv.org/pdf/2009.06732) attention kernels, sparse attention, sliding-window attention, state-space alternatives, and other long-context optimizations.

      - question: "12. Why is attention scaled by √d?"
        answer: |
          In scaled dot-product attention, the raw query-key dot product is divided by $\sqrt{d_k}$, where $d_k$ is the key dimension. The reason is numerical stability. When the dimensionality is large, dot products tend to grow in magnitude, which can push the softmax into regions where it becomes extremely peaked. That, in turn, makes gradients small and training less stable.

          Scaling by $\sqrt{d_k}$ keeps the variance of the dot products at a more controlled level, which helps the softmax behave better and improves optimization.

          So the short interview answer is: the scaling factor prevents large dot products from making softmax too sharp, which stabilizes training and improves gradient flow.

      - question: "13. Why does the Transformer use multi-head attention?"
        answer: |
          Multi-head attention runs several attention operations in parallel, each on a different learned projection of the input. Instead of forcing the model to use one single attention pattern, it lets different heads focus on different relationships at the same time.

          In practice, one head may capture short-range syntactic relations, another may focus on long-range dependencies, and another may help with copying or positional patterns. The outputs of all heads are then concatenated and projected back into the model dimension.

          This improves representational capacity. A single attention head could in principle learn one useful pattern, but multiple heads let the model attend to information from multiple representation subspaces simultaneously.

      - question: "14. What is the role of residual connections, layer normalization, and the feed-forward sublayer?"
        answer: |
          Residual connections help preserve information and improve optimization by allowing each sublayer to learn a refinement to its input rather than having to relearn the full transformation. In the original Transformer, each attention or feed-forward sublayer is wrapped as:
          
          $$\text{LayerNorm}(x + \text{Sublayer}(x))$$
          
          This supports stable training of deep stacks.

          Layer normalization stabilizes activations across hidden dimensions and improves optimization behavior. It helps reduce training instability and keeps representations in a usable range as they pass through many layers.

          The position-wise feed-forward network is the non-attention part of each layer. It applies the same small MLP independently to each token position. Attention mixes information across tokens, while the feed-forward sublayer performs nonlinear transformation within each token representation. Together they provide both cross-token interaction and per-token feature processing.

      - question: "15. What is the difference between encoder-only, decoder-only, and encoder-decoder Transformers?"
        answer: |
          Encoder-only Transformers use bidirectional self-attention over the full input. They are typically best suited for understanding tasks such as classification, tagging, or retrieval, because each token can attend to both left and right context. BERT is the canonical example.

          Decoder-only Transformers use causal self-attention, meaning each token can attend only to earlier tokens. They are trained for next-token prediction and are the dominant architecture for generative LLMs such as GPT-style models. This is the architecture most directly associated with modern chat and code generation systems.

          Encoder-decoder Transformers combine both. The encoder reads the source input, and the decoder generates outputs autoregressively while attending both to past generated tokens and to the encoder outputs through cross-attention. This architecture is common for sequence-to-sequence tasks such as translation, summarization, and transcription.

      - question: "16. What is masked self-attention, and where is it used?"
        answer: |
          Masked self-attention is self-attention with a causal mask applied so that a token cannot attend to future positions. In effect, position $i$ can only use information from positions $\le i$. This preserves the autoregressive property needed for next-token generation.

          It is used in decoder self-attention, including decoder-only LLMs and the decoder portion of encoder-decoder models. Without this mask, the model could look ahead at the target sequence during training, which would make the learning objective invalid for generation.

          The key distinction is that encoder self-attention is usually unmasked and bidirectional, while decoder self-attention is masked and causal.

      - question: "17. What is cross-attention, and how is it different from self-attention?"
        answer: |
          In self-attention, the queries, keys, and values all come from the same sequence. Each token attends to other tokens within that same representation stream.

          In cross-attention, the queries come from one sequence and the keys and values come from another. In encoder-decoder Transformers, the decoder uses cross-attention to attend to the encoder’s output representations. That is how generated tokens condition on the source input.

          So the core difference is source of information: self-attention mixes information within one sequence, while cross-attention injects information from a different sequence or modality.

      - question: "18. Why do Transformers need positional encodings?"
        answer: |
          Self-attention by itself is permutation-invariant. If you only feed token embeddings into attention, the mechanism can learn relationships between token identities, but it has no built-in notion of order. That means a model would not inherently distinguish “dog bites man” from “man bites dog” unless sequence position is injected somewhere in the representation. The original Transformer solves this by adding positional information to token embeddings before they enter the attention stack.

          Positional encodings are therefore necessary because language is ordered. Word order affects syntax, meaning, discourse structure, and causal dependencies in generation. In practice, positional information lets the model represent where a token is and reason about relative placement across the sequence.

          A good interview answer is: attention tells the model what relates to what, while positional encoding tells it where things are in the sequence. Without positional information, a Transformer would be much worse at modeling structured language.

      - question: "19. Compare sinusoidal positional encodings with RoPE. Why is RoPE widely used?"
        answer: |
          The original Transformer used sinusoidal positional encodings: fixed functions of position that are added to token embeddings. They are simple, parameter-free, and let the model extrapolate somewhat beyond the sequence lengths seen in training because positions are generated from a deterministic formula rather than learned lookup vectors.

          [RoPE, or Rotary Position Embedding](https://arxiv.org/abs/2104.09864), injects position differently. Instead of adding a positional vector to the token representation, it rotates query and key vectors in attention according to token position. This makes positional information part of the attention computation itself and gives RoPE a useful relative-position property: the attention score between two positions depends naturally on their relative offset as well as their content. The RoFormer paper highlights flexibility with sequence length and decaying inter-token dependency with increasing relative distance as important properties.

          RoPE is widely used because it has turned out to be a strong practical trade-off for decoder-style LLMs. It works well with long-context scaling, is easy to implement, does not require a learned absolute-position table, and integrates naturally into modern attention stacks. That does not mean it is universally optimal, but it has become a common default because it performs well in practice while remaining computationally convenient.

      - question: "20. What are the main limitations of the Transformer architecture?"
        answer: |
          The main limitation is the quadratic cost of standard self-attention with respect to sequence length. As input gets longer, the attention matrix grows as $N \times N$, which increases both memory use and compute cost. This is one of the fundamental reasons long-context training and inference are expensive.

          A second limitation is that longer context does not automatically mean equally good use of all positions. Empirical work on long-context language models shows that performance can degrade depending on where relevant information appears, especially when it is in the middle of long inputs. So even when a model technically supports a long context window, utilization can still be imperfect.

          A third limitation is systems-level efficiency. Transformer inference is bottlenecked not just by attention but also by memory bandwidth, KV cache growth, and feed-forward computation. This is why efficient kernels, sparse or sliding-window variants, and alternative architectures continue to be active research areas.

          A careful interview answer should avoid saying “Transformers cannot handle long context.” They can, but the trade-offs are real: cost rises quickly, deployment gets harder, and quality does not scale perfectly with nominal context length.

      - question: "21. How do Transformers handle long-range dependencies?"
        answer: |
          Transformers handle long-range dependencies through self-attention. Any token can, in principle, attend directly to any other token in the sequence in a single layer, rather than passing information step by step through recurrent state as in an RNN. That direct connectivity is one of the key reasons Transformers outperform earlier sequence models on many language tasks.

          Positional mechanisms also matter. Relative or rotary positional schemes help the model reason about token distances and order more effectively than relying only on absolute positions. This improves the model’s ability to represent long-range structure, especially in modern decoder-style language models.

          However, handling long-range dependencies in theory is not the same as using long context perfectly in practice. Long-context evaluations show that model performance can be sensitive to where relevant information appears, and many models still struggle to robustly retrieve and use information across very long inputs.

          So the balanced answer is: Transformers are better than RNNs at modeling long-range dependencies because attention provides direct access across positions, but practical long-context performance is still constrained by compute costs and imperfect context utilization.

      - question: "22. How do Transformers address the vanishing gradient problem?"
        answer: |
          Transformers reduce vanishing-gradient issues mainly because they do not rely on long recurrent chains through time the way RNNs do. In an RNN, information and gradients must propagate through many sequential steps, which can make optimization difficult over long sequences. In a Transformer, attention gives shorter paths between tokens, which makes long-range credit assignment easier.

          Residual connections are another major reason optimization is more stable. In the original architecture, each sublayer is wrapped in a residual path plus normalization, which helps gradients flow through deep stacks without having to pass only through nonlinear transformations.

          Layer normalization also contributes by stabilizing activations during training, which improves optimization behavior in deep models. So the practical answer is not that Transformers “solve” vanishing gradients completely, but that their architecture makes optimization far more manageable than classic recurrent networks for large-scale sequence modeling.

      - question: "23. Compare Transformers with state-space models such as Mamba."
        answer: |
          Transformers and state-space models solve sequence modeling in different ways. Transformers rely on attention, which gives each token direct access to every other token in the sequence. That is a strong fit for language because it supports flexible, content-based interactions and in-context learning, but standard attention has quadratic cost in sequence length. [Mamba](https://arxiv.org/abs/2312.00752) replaces attention with a selective state-space mechanism whose parameters depend on the input, giving linear-time sequence processing and much better scaling on very long inputs. The Mamba paper positions this as a response to the computational inefficiency of Transformers on long sequences and reports higher throughput with linear scaling in sequence length.

          In practice, Transformers remain the default for general-purpose LLMs because the ecosystem, tooling, and empirical track record are much stronger. Mamba is attractive when long contexts, streaming, or latency are dominant constraints. The trade-off is that Mamba’s core claim is improved efficiency and strong language modeling performance, but it is still newer and less battle-tested than the Transformer stack used in most production LLMs. A careful interview answer is that Mamba is not a drop-in “replacement” in every setting. It is a promising alternative architecture with better asymptotic sequence scaling, while Transformers still dominate broad LLM deployment.

  - id: "pretraining-tuning-and-adaptation"
    title: "3. Pretraining, tuning, and adaptation"
    intro: "This section covers how LLMs are trained, adapted, and aligned for practical use. These AI engineer interview questions focus on pretraining objectives, fine-tuning strategies, instruction tuning, alignment methods, and parameter-efficient adaptation, helping assess whether a candidate understands both the training pipeline and the trade-offs involved in specializing large models."
    qa:
      - question: "24. What are the common pretraining objectives for LLMs? Compare causal language modeling and masked language modeling."
        answer: |
          The two most common objectives are causal language modeling and masked language modeling. Causal language modeling trains the model to predict the next token given previous tokens. This is the core objective behind GPT-style decoder-only models and is the default objective for modern generative LLMs. [GPT-3](https://arxiv.org/pdf/2005.14165) is a canonical example.

          Masked language modeling trains the model to recover masked tokens from surrounding context. [BERT](https://arxiv.org/abs/1810.04805) is the canonical example. In the original BERT setup, masked language modeling was paired with next sentence prediction, although later work such as RoBERTa showed that MLM remained highly competitive even after removing NSP and changing other training details.

          The main difference is behavioral. Causal LM is naturally aligned with generation because it learns left-to-right next-token prediction. MLM is bidirectional and often stronger for representation learning and understanding tasks, but it is less natural for open-ended text generation. That is why most modern chat-style and code-generation LLMs are causal decoder-only models rather than MLM-based encoders.

      - question: "25. What is self-supervised learning in LLM pretraining?"
        answer: |
          Self-supervised learning means the model learns from unlabeled text by creating supervision from the data itself. The targets come from the structure of text, not from human-provided class labels. In causal LM, the next token is the supervision target. In MLM, the masked tokens are the supervision target.

          This matters because it allows pretraining at web scale. Instead of manually labeling billions of examples, the model can learn general language patterns, syntax, semantics, and some factual associations directly from raw text corpora. That pretraining is what later makes prompting, fine-tuning, instruction tuning, and alignment effective.

      - question: "26. What is fine-tuning, and when is it needed?"
        answer: |
          Fine-tuning is the process of taking a pretrained model and continuing training on a more specific dataset or objective so the model adapts to a task, domain, behavior style, or deployment requirement. In the InstructGPT pipeline, for example, a pretrained GPT-3 model is first supervised fine-tuned on [instruction-following demonstrations](https://arxiv.org/pdf/2203.02155) before preference-based alignment is applied.

          It is needed when base pretraining is not enough. Common cases include adapting to a domain such as legal or biomedical text, improving instruction following, enforcing output style or structure, aligning model behavior with human preferences, or improving performance on a narrow task where prompting alone is insufficient. A good interview distinction is that pretraining gives broad capability, while fine-tuning specializes that capability.

      - question: "27. What are the main types of fine-tuning used with LLMs?"
        answer: |
          The main types are full fine-tuning and [parameter-efficient fine-tuning](https://arxiv.org/pdf/2406.04879). Full fine-tuning updates all or most model weights. It gives maximum flexibility but is expensive in memory, compute, storage, and operational complexity.

          Parameter-efficient fine-tuning, or PEFT, updates only a small subset of parameters or adds small trainable modules while freezing the base model. Common PEFT families include adapters, prefix tuning, prompt tuning, and LoRA. These methods are widely used when the base model is large and repeated full copies of tuned checkpoints would be too expensive.

          A separate practical categorization is by objective: supervised fine-tuning on labeled examples, instruction tuning on task-and-instruction mixtures, and alignment tuning using preference data or reward-based objectives.

      - question: "28. What is instruction tuning, and how does it improve usability?"
        answer: |
          Instruction tuning is supervised fine-tuning on datasets where inputs are framed as instructions and outputs demonstrate the desired response behavior. The goal is not merely to improve task accuracy, but to make the model respond in a way that follows human instructions more reliably across many tasks.

          It improves usability because the base language modeling objective is not the same as “follow the user’s intent helpfully and safely.” The InstructGPT paper shows that fine-tuning on demonstrations and human preferences can make much smaller models preferred over much larger base GPT-3 models in human evaluations. That is a strong sign that usability and helpfulness do not emerge automatically from scaling the pretraining objective alone.

      - question: "29. What is alignment tuning, and why is it needed?"
        answer: |
          Alignment tuning adjusts a model so that its behavior better matches human preferences, safety requirements, and task intent, rather than only maximizing next-token likelihood. In InstructGPT, this is done by first collecting demonstrations, then human rankings of outputs, and then further tuning with reinforcement learning from human feedback.

          It is needed because base LLMs can be fluent but still unhelpful, unsafe, untruthful, or misaligned with the actual user request. The InstructGPT paper states this directly: making models bigger does not inherently make them better at following intent. Alignment tuning is therefore a correction layer on top of pretraining, not a substitute for pretraining.

      - question: "30. How do you prevent overfitting during fine-tuning?"
        answer: |
          The main levers are dataset quality, dataset size relative to task scope, validation-based early stopping, conservative learning rates, regularization, and limiting the number of trainable parameters when appropriate. [RoBERTa](https://arxiv.org/pdf/1907.11692) highlights how training setup choices such as data volume, batch size, and sequence length significantly affect outcomes, and that lesson carries into fine-tuning as well.

          In practice, PEFT methods often help because they reduce the number of trainable parameters and constrain how much the base model can drift. Good evaluation discipline also matters: separate validation sets, held-out prompts, and checks for degradation in general behavior, not just gains on the narrow tuning set.

      - question: "31. What is catastrophic forgetting, and why is it a concern?"
        answer: |
          Catastrophic forgetting is the loss of previously learned capabilities when a pretrained model is adapted too aggressively to a new task or narrow dataset. The concern is that a model may get better at the new task while becoming worse at general language performance, robustness, or other downstream behaviors.

          This matters especially for LLMs because they are valued for broad capability. If tuning a model for one application damages general reasoning, instruction following, or calibration, the system may become less reliable overall. The risk is one reason PEFT, careful evaluation, and staged training pipelines are common in practice.

      - question: "32. What is PEFT, and why is it useful?"
        answer: |
          PEFT stands for parameter-efficient fine-tuning. Instead of updating the full pretrained model, PEFT updates only a small number of parameters or inserts lightweight trainable components while freezing the backbone. The goal is to preserve most of the pretrained model while making adaptation much cheaper.

          It is useful because full fine-tuning large models is expensive and operationally awkward. PEFT reduces GPU memory requirements, shortens training time, makes it easier to store multiple task-specific variants, and can get performance close to full fine-tuning for many adaptation tasks.

      - question: "33. What is LoRA, and how does it work?"
        answer: |
          [LoRA, or Low-Rank Adaptation](https://arxiv.org/abs/2106.09685), freezes the pretrained model weights and injects trainable low-rank matrices into selected layers, typically in the Transformer stack. Instead of learning a full dense weight update, LoRA approximates the update as a low-rank decomposition.

          The practical effect is that only a tiny fraction of parameters are trained, but the model can still adapt effectively. The LoRA paper reports major reductions in trainable parameters and GPU memory versus full fine-tuning, while maintaining similar model quality and avoiding added inference latency after merging.

      - question: "34. What is QLoRA, and how does it differ from LoRA?"
        answer: |
          [QLoRA](https://arxiv.org/abs/2305.14314) extends LoRA by quantizing the pretrained base model to 4-bit while still backpropagating through it into LoRA adapters. The key result from the QLoRA paper is that this reduces memory enough to fine-tune a 65B model on a single 48GB GPU while preserving task performance close to 16-bit fine-tuning.

          So the difference is straightforward. LoRA adds low-rank trainable adapters on top of a frozen full-precision base model. QLoRA keeps the LoRA idea but also quantizes the frozen base model and introduces memory-saving techniques such as NF4, double quantization, and paged optimizers.

      - question: "35. When would you choose prompt engineering over fine-tuning, and vice versa?"
        answer: |
          Choose prompt engineering when the base model is already capable enough, the task is changing frequently, you need fast iteration, or the main requirement is controlling framing, format, or instruction clarity rather than teaching new domain behavior. GPT-3’s few-shot and zero-shot results are the classic example of getting useful task performance without task-specific fine-tuning.

          Choose fine-tuning when prompting is not stable enough, you need consistent behavior at scale, the domain is specialized, the output style must be tightly controlled, or the model needs better instruction following or alignment than prompting alone can provide. InstructGPT is the clearest example that fine-tuning on demonstrations and preferences can significantly improve user-perceived quality over raw prompting of a much larger base model.

          A strong interview answer is that prompt engineering is usually the cheaper first step, while fine-tuning is justified when the gain in reliability, specialization, or behavior control is worth the extra data and maintenance cost.

      - question: "36. What is Mixture-of-Experts (MoE), and how does it change training and inference behavior?"
        answer: |
          Mixture-of-Experts is an architecture in which only a subset of model components, called experts, is activated for a given token or example. A routing mechanism decides which experts to use, so the model can have a very large total parameter count while using only a fraction of those parameters per token. Switch Transformer is a canonical MoE example built around sparse routing.

          This changes training and inference behavior by decoupling total parameter count from per-token compute. You can scale model capacity much more aggressively without making every forward pass dense. That can improve parameter efficiency, but it also introduces engineering challenges such as routing stability, expert load balancing, and distributed systems complexity.

          A useful concise framing is: dense models use all parameters for every token, while MoE models use all parameters across the system but only some parameters for each token.

      - question: "37. What are scaling laws in LLM training?"
        answer: |
          Scaling laws are empirical regularities that relate model performance to factors such as parameter count, dataset size, and compute budget. Early work showed predictable performance improvements as models and data scale. Later work, especially Chinchilla, refined this by arguing that many large models were undertrained relative to their size and that compute-optimal performance requires balancing model size and token count more carefully.

          The Chinchilla result is especially important for interviews. It argues that, under a fixed compute budget, model size and number of training tokens should scale together, and that a smaller model trained on more data can outperform a much larger model trained on too little data. That insight changed how practitioners think about compute-optimal pretraining.

          A careful answer should also note that scaling laws are empirical, not universal laws of nature. They are useful for planning and budgeting, but the exact trade-offs depend on architecture, data quality, objective, and training setup.

  - id: "inference-decoding-and-performance"
    title: "4. Inference, decoding, and performance"
    intro: "This section shifts from model training to model serving, which is a core part of AI engineering in practice. These AI engineer interview questions examine how inference works, what makes LLM serving expensive, and how techniques such as KV cache, quantization, batching, and FlashAttention affect latency, throughput, and deployment efficiency."
    qa:
      - question: "38. Walk through the steps of an LLM inference request."
        answer: |
          A typical LLM inference request has two phases: prefill and decode. First, the input text is tokenized into token IDs. Those IDs are embedded and passed through the model to compute hidden states and attention keys and values for the full prompt. This is the prefill phase, and it is usually the most expensive part for long prompts. During this phase, the model also builds the KV cache that will be reused in generation.

          After prefill, generation enters the decode phase. The model predicts the next token, applies a decoding rule such as greedy or sampling-based selection, appends the new token to the sequence, updates the KV cache with the new token’s key and value tensors, and repeats until a stop condition is met, such as EOS, max tokens, or a stop sequence. Because generation is autoregressive, each new step depends on all prior tokens, including generated ones.

          In a production system, that basic loop is wrapped by serving logic: request scheduling, batching, GPU memory management, optional streaming, and optimizations such as static cache allocation, FlashAttention, speculative decoding, or quantization.

      - question: "39. What is autoregressive generation?"
        answer: |
          Autoregressive generation means the model generates output one token at a time, where each new token is predicted conditioned on the prompt plus all previously generated tokens. This is the standard generation pattern for decoder-only LLMs.

          The important systems implication is that decoding is inherently sequential across generated tokens. Even if the GPU parallelizes computation within a step, token $t+1$ cannot be finalized until token $t$ is known. That serial dependency is one of the main reasons LLM inference is slower than many other deep learning workloads.

      - question: "40. What is KV cache, and how does it speed up inference?"
        answer: |
          In Transformer decoding, each token produces key and value tensors used by attention. Without caching, the model would recompute those tensors for all prior tokens at every generation step. [KV cache](https://huggingface.co/blog/kv-cache-quantization) stores the past keys and values so the model can reuse them instead of recomputing them.

          This speeds up autoregressive inference because each new decode step only needs to compute attention state for the new token and attend over cached past state, rather than re-running the full prefix computation from scratch. The trade-off is memory: KV cache grows with sequence length, batch size, number of layers, and attention head dimensions.

      - question: "41. How do you estimate KV cache memory requirements?"
        answer: |
          A practical estimate is:

          $$
          \text{KV cache bytes} \approx 2 \times L \times B \times n_{\text{layers}} \times n_{\text{kv-heads}} \times d_{\text{head}} \times \text{bytes per element}
          $$

          where the leading 2 accounts for keys and values, $L$ is sequence length, $B$ is batch size, $n_{\text{layers}}$ is number of layers, $n_{\text{kv-heads}}$ is the number of key-value heads, and $d_{\text{head}}$ is head dimension.

          For example, Hugging Face’s KV-cache quantization article estimates that for Llama-2 7B at 10,000 tokens in fp16, KV cache alone is about 5 GB using the formula $2 \times 2 \times 32 \times 32 \times 128 \times 10000$, where the second 2 is bytes per fp16 element. That example is useful because it shows why long-context serving often becomes memory-bound before it becomes compute-bound.

      - question: "42. What is quantization, and how does it affect speed, memory, and accuracy?"
        answer: |
          Quantization stores model weights, and sometimes activations or KV cache, in lower precision such as INT8 or 4-bit formats instead of fp16 or fp32. The main benefit is lower memory use, which can make otherwise impractical models fit on available hardware.

          Its effect on speed is not uniform. Quantization often improves throughput when memory bandwidth or VRAM capacity is the bottleneck, but it can also add dequantization overhead and slightly increase latency in some settings. Hugging Face explicitly notes that if GPU memory is not your constraint, quantization may not help latency and can even hurt it slightly, depending on the scheme.

          Its effect on accuracy depends on the method and aggressiveness. Good quantization schemes often preserve quality well, but lower precision still introduces approximation error. The trade-off is almost always memory savings first, with speed and quality depending on implementation and workload.

      - question: "43. What is mixed precision inference?"
        answer: |
          Mixed precision inference means using more than one numerical precision in the same inference workload, typically lower precision for most matrix multiplies and higher precision where numerical stability matters. Common combinations are fp16 or bf16 for bulk compute and fp32 for selected accumulations or sensitive operations.

          The benefit is that lower-precision formats reduce memory footprint and memory bandwidth use, and modern GPUs accelerate them efficiently with Tensor Cores. That often increases throughput substantially without meaningfully changing model quality if the precision mix is chosen carefully.

      - question: "44. What is FlashAttention, and what problem does it solve?"
        answer: |
          [FlashAttention](https://arxiv.org/abs/2205.14135) is an exact attention algorithm designed to reduce the memory traffic of standard attention. The core idea is IO-awareness: attention is often bottlenecked not just by arithmetic but by reads and writes between GPU high-bandwidth memory and on-chip SRAM. FlashAttention uses tiling to reduce those memory transfers.

          The problem it solves is that standard attention becomes slow and memory-hungry on long sequences. FlashAttention improves wall-clock performance and memory efficiency without approximating attention scores, which is why it became widely adopted in LLM training and inference stacks.

      - question: "45. What is speculative decoding, and when is it useful?"
        answer: |
          Speculative decoding speeds up generation by using a smaller, faster draft model to propose several candidate tokens, then verifying them with the larger target model in fewer expensive passes. If the proposed tokens are accepted, the large model effectively advances multiple steps at once.

          It is useful when the target model is much slower than a small assistant model and when latency matters. The main appeal is that, with the right algorithm, you can speed up decoding without changing the final output distribution relative to the target model alone. In practice, gains depend heavily on how fast and compatible the draft model is.

      - question: "46. What is batch inference, and how does batching affect throughput and latency?"
        answer: |
          Batch inference means serving multiple requests together in one model execution instead of running them one by one. This increases hardware utilization because GPUs are most efficient when enough work is available to keep compute units busy.

          Batching usually improves throughput, meaning more tokens or requests processed per second. But it can increase latency, especially if the system waits to accumulate requests before launching a batch. NVIDIA’s Triton documentation states this trade-off directly: increasing batch size or adding batch delay can increase throughput at the cost of higher latency.

          For LLMs, serving engines often prefer dynamic or continuous batching because request lengths vary. Static batching suffers from stragglers, while continuous batching allows new requests to enter as others finish, improving utilization under real workloads.

      - question: "47. What are the main bottlenecks in LLM inference on modern GPUs?"
        answer: |
          The biggest bottlenecks are usually memory capacity, memory bandwidth, and the serial nature of autoregressive decoding. Large models require huge parameter storage, and long sequences require large KV caches. Even when raw compute is strong, moving weights and cache data efficiently can dominate runtime.

          Attention itself is also a bottleneck for long contexts because of sequence-length scaling and heavy IO. That is exactly why optimizations like FlashAttention and KV-cache engineering matter.

          At the serving level, fragmentation and inefficient KV-cache allocation are major practical bottlenecks. The vLLM team explicitly identifies memory waste and KV-cache management as central inference constraints, which is why techniques like PagedAttention and continuous batching improve throughput so much in production systems.

      - question: "48. How do you measure LLM inference performance?"
        answer: |
          You usually measure LLM inference with a mix of latency, throughput, and resource efficiency metrics. Common latency metrics include time to first token and per-token or end-to-end latency. Common throughput metrics include requests per second or tokens per second. Resource metrics include GPU memory use, batch efficiency, and cost per generated token.

          You should also measure under realistic workload conditions, not just single-request benchmarks. Batch size, prompt length, output length, and concurrency all change performance significantly. Triton’s guidance reflects this by recommending empirical tuning of batch size and delay against a latency budget, rather than assuming a fixed optimal configuration.

          For AI engineering interviews, a solid answer is: measure both user-facing latency and system-facing throughput, and always tie them to workload shape, hardware, precision, and memory behavior. A model that looks fast in isolated tests may perform poorly under concurrent long-context serving.
  - id: "decoding-strategies"
    title: "5. Decoding and prompting"
    intro: "This section focuses on how output behavior is controlled at inference time without changing model weights. These AI engineer interview questions cover decoding strategies, temperature, prompt design, in-context learning, reasoning-oriented prompting methods, and structured output techniques, all of which are directly relevant when building reliable LLM applications."
    qa:
      - question: "49. What is a decoding strategy in LLM generation?"
        answer: |
          A decoding strategy is the rule used to turn the model’s next-token probability distribution into an actual output sequence. After the model produces logits over the vocabulary, decoding decides which token to emit next and repeats that process token by token until a stop condition is reached. Different decoding strategies trade off determinism, diversity, coherence, and search cost.

          In practice, decoding is not part of the model’s learned weights. It is an inference-time control policy layered on top of the model. That is why the same model can produce very different outputs under greedy decoding, beam search, or stochastic sampling.

      - question: "50. Compare greedy decoding, beam search, top-k, and top-p sampling."
        answer: |
          Greedy decoding selects the single highest-probability token at each step. It is simple and fast, but it can get stuck in bland or locally optimal continuations because it never explores alternatives. This is one reason deterministic decoding can lead to repetitive or low-diversity text.

          Beam search keeps several candidate sequences alive at once, expanding and rescoring them across steps. It explores more of the search space than greedy decoding and can improve quality in tasks where likelihood is closely aligned with the objective, such as some translation-style settings. But it is more expensive than greedy decoding, and for open-ended generation it can still produce repetitive or unnatural outputs because maximizing likelihood is not always the same as maximizing human quality.

          Top-k sampling restricts the candidate set at each step to the k most probable tokens and then samples from that reduced set. This adds diversity while still preventing the model from choosing very low-probability tokens. The downside is that a fixed k may be too restrictive in some contexts and too permissive in others.

          Top-p sampling, also called nucleus sampling, chooses from the smallest set of tokens whose cumulative probability mass exceeds a threshold p. Unlike top-k, the size of the candidate set adapts to the uncertainty of the distribution. This is often a better fit for open-ended text generation, and the nucleus sampling paper specifically argues that sampling from the dynamic probability mass helps avoid degeneration seen in maximization-based methods.

          A good interview summary is: greedy is cheapest and most deterministic, beam search is broader but more expensive, top-k adds controlled randomness, and top-p adapts randomness to the confidence of the model’s distribution.

      - question: "51. What does temperature control, and how does it affect outputs?"
        answer: |
          Temperature rescales the model’s logits before sampling. Lower temperature makes the probability distribution sharper, so the model is more likely to pick high-probability tokens. Higher temperature flattens the distribution, increasing randomness and the chance of lower-probability tokens being selected. OpenAI’s API documentation describes lower values as more focused and deterministic, and higher values as more random.

          In effect, temperature controls exploration. Low temperature tends to improve consistency and reduce variation, while high temperature increases diversity but can also increase mistakes, instability, or incoherence. It matters mainly when you are using a stochastic decoding strategy. Under fully greedy selection, temperature has little or no practical effect because no sampling occurs.

      - question: "52. What is zero-shot prompting?"
        answer: |
          Zero-shot prompting means asking the model to perform a task using only an instruction, without including worked examples in the prompt. GPT-3 popularized the zero-shot, one-shot, and few-shot framing and showed that large language models can perform many tasks directly from natural-language instructions.

          Its main benefit is simplicity. You do not need to curate examples, and iteration is fast. Its limitation is that performance may be less reliable on tasks where the model benefits from seeing the intended pattern explicitly. GPT-3’s results show that zero-shot can be strong, but also that one-shot and few-shot setups often improve performance on many benchmarks.

      - question: "53. What is few-shot prompting, and what are its benefits?"
        answer: |
          Few-shot prompting provides the model with a small number of input-output examples before the real query. The examples demonstrate the task format, style, label mapping, or reasoning pattern you want the model to follow. GPT-3 showed that this can significantly improve performance without updating model weights.

          The main benefits are better task specification, better output consistency, and adaptation without training. Few-shot prompting is especially useful when the task is ambiguous, when the output format must be precise, or when the model needs help inferring what counts as a correct response. It is often the fastest way to improve behavior before considering fine-tuning.

      - question: "54. What is in-context learning, and how is it related to few-shot prompting?"
        answer: |
          In-context learning, or ICL, refers to the model’s ability to adapt its behavior from information placed in the prompt context rather than by changing its parameters. The model appears to learn the task from the examples and instructions present in the current context window. GPT-3 is the classic reference point for this framing.

          Few-shot prompting is one practical form of in-context learning. When you include labeled examples before the actual task instance, you are using the prompt context itself as a temporary task specification. Zero-shot prompting is also a form of in-context conditioning, but few-shot prompting makes the pattern more explicit by showing examples.

      - question: "55. What is chain-of-thought prompting, and when does it help?"
        answer: |
          Chain-of-thought prompting asks the model to produce or follow intermediate reasoning steps before giving the final answer. The core finding from the original paper is that sufficiently large language models improve on reasoning tasks when prompted with exemplars that include step-by-step reasoning.

          It helps most on multi-step reasoning problems such as arithmetic, symbolic reasoning, commonsense reasoning, and structured decision tasks where the path to the answer matters. It is less useful for straightforward factual lookup or cases where the model already answers correctly without extra reasoning overhead. It can also increase latency and verbosity, so it should be used selectively rather than by default.

      - question: "56. What is self-consistency prompting?"
        answer: |
          Self-consistency prompting is an extension of chain-of-thought prompting where you sample multiple reasoning paths and then aggregate them, typically by majority vote over the final answers. The key idea is that a single reasoning path may be brittle, but multiple diverse paths can improve robustness if the correct answer is the one most consistently supported.

          Its main value is improved reasoning accuracy on tasks where one sampled chain of thought may go wrong. The trade-off is higher inference cost because the model must generate several candidate reasoning traces instead of one.

      - question: "57. What is a system prompt, and how is it different from a user prompt?"
        answer: |
          A system prompt is a higher-level instruction that sets global behavior or constraints for the conversation, while a user prompt is the task request coming from the end user. OpenAI’s chat-format documentation describes system instructions as a way to guide the model’s behavior across the conversation, while user messages contain the user’s actual requests.

          In practical terms, the system prompt defines things like role, tone, policy constraints, output style, or persistent instructions. The user prompt defines what should be done right now. Good prompting separates these concerns: stable behavior and guardrails go in the system instruction, while task-specific content goes in the user message.

          One nuance is that some newer OpenAI materials refer to a developer message for API control, and describe it as what many people think of as the system prompt. The broader point remains the same: there is a higher-priority instruction layer that sets behavior, and there is a user layer that carries the request.

      - question: "58. How do you force an LLM to produce structured output such as valid JSON?"
        answer: |
          The most reliable way is to use Structured Outputs with a supplied JSON Schema, not prompt wording alone. [OpenAI’s Structured Outputs](https://openai.com/index/introducing-structured-outputs-in-the-api/) documentation states that JSON mode ensures valid JSON, but only Structured Outputs is designed to ensure conformance to a developer-supplied schema. It does this through constrained decoding against the schema.

          If schema enforcement is not available, the next-best option is JSON mode plus explicit prompt instructions to return JSON. OpenAI’s API docs and Help Center both note that JSON mode guarantees valid JSON syntax, but not that the output matches a particular schema. They also warn that you must explicitly instruct the model to produce JSON in the prompt context.

          In production, the standard pattern is: define a schema, use structured-output tooling when available, validate the result after generation, and retry or repair if validation fails. Prompting alone can help, but it is not the strongest control mechanism for machine-readable outputs.
  - id: "alignment-quality-and-reliability"
    title: "6. Alignment, quality, and reliability"
    intro: "This section addresses the part of AI engineering that goes beyond raw model capability: making systems safe, useful, and dependable in production. These AI engineer interview questions cover alignment methods, evaluation, hallucination reduction, bias, production risks, and monitoring for degradation, which are all central to deploying LLM systems responsibly and effectively."
    qa:
      - question: "59. What is RLHF, and how does it improve model behavior?"
        answer: |
          RLHF stands for Reinforcement Learning from Human Feedback. In the standard pipeline, you start with a pretrained language model, collect human demonstrations or preference comparisons, train a reward model to predict which outputs humans prefer, and then optimize the policy model against that reward while constraining it not to drift too far from the starting model. This is the core setup described in the InstructGPT work.

          It improves model behavior because the base next-token objective is not the same as “be helpful, follow instructions, be safe, and answer in the way users actually want.” RLHF adds an optimization stage that pushes the model toward outputs people judge as better. InstructGPT showed that a 1.3B RLHF-tuned model could be preferred by human labelers over a much larger 175B base GPT-3 model, which is strong evidence that alignment training can matter more than raw scale for usability.

      - question: "60. What are the limitations of RLHF?"
        answer: |
          The main limitation is that RLHF is a multi-stage, complex, and unstable procedure. You need high-quality preference data, then a reward model, then policy optimization, and each stage can introduce failure modes. The DPO paper summarizes this clearly: RLHF is effective but operationally complex, and optimization can be unstable.

          A second limitation is that the model becomes aligned to the preferences of the raters and the reward proxy, not to some universal notion of truth, safety, or fairness. The InstructGPT paper itself notes limitations around labeler disagreement and the difficulty of measuring honesty and harm in generative systems. More recent critiques also argue that RLHF can suppress minority preferences or oversimplify plural human values.

          A third limitation is scalability and maintenance cost. Human feedback is expensive to collect, can become outdated when policies change, and does not cover all edge cases. OpenAI’s rule-based rewards writeup explicitly points to these inefficiencies as one reason to supplement traditional RLHF pipelines with more scalable approaches.

      - question: "61. Compare RLHF, DPO, and RLAIF."
        answer: |
          RLHF is the classic three-part pipeline: collect human preferences, train a reward model, then optimize the policy with reinforcement learning, often with KL regularization to keep it near a reference model. It is powerful but operationally heavy and can be unstable.

          DPO, or Direct Preference Optimization, removes the explicit reward-model-plus-RL stage and instead optimizes the policy directly from preference pairs with a classification-style objective. The main selling points are simplicity, stability, and lower training complexity compared with PPO-based RLHF. The trade-off is that it is still only as good as the preference data and objective assumptions behind it.

          RLAIF, or Reinforcement Learning from AI Feedback, replaces some or all human preference judgments with AI-generated feedback. Constitutional AI is the standard reference: the model uses written principles and AI-generated critiques/preferences to reduce dependence on dense human labeling. The main benefit is scalability. The main risk is that the system inherits the limitations and biases of the evaluator model or constitution used to generate feedback.

          A clean interview summary is: RLHF uses human preferences plus RL, DPO uses preferences more directly with a simpler objective, and RLAIF uses AI-generated preference signals to scale oversight.

      - question: "62. How do you evaluate LLMs? Include intrinsic metrics, task metrics, and benchmarks."
        answer: |
          Good LLM evaluation is multi-layered. At the lowest level, you have intrinsic metrics like loss and perplexity, which measure how well the model predicts text statistically. These are useful during training, but they are not enough for deployment decisions because low perplexity does not guarantee truthfulness, safety, or usefulness. HELM was created partly because single-metric evaluation is too narrow for general-purpose language models.

          Then you have task-specific metrics. For classification or QA that might be accuracy, F1, exact match, calibration, or pass rate. For summarization and translation it might be ROUGE or BLEU, though those have known limitations. For code generation it may be functional correctness benchmarks. The right metric depends on the task, and this is where many evaluation mistakes happen: people use the easiest metric rather than the one that maps to the real failure mode.

          Finally, you have benchmarks and holistic evaluation frameworks. Examples include MMLU for broad knowledge, TruthfulQA for truthfulness under common misconceptions, and HELM for broader evaluation across accuracy, robustness, fairness, toxicity, and efficiency. HELM’s main point is that language models should be evaluated across many scenarios and many metrics, not just one headline number.

          For production systems, benchmark scores are not enough. You also need application-level evaluation: latency, hallucination rate on your domain, refusal behavior, structured-output validity, human preference tests, and monitoring on real traffic. NIST’s generative AI profile explicitly frames evaluation as part of broader risk management, not just offline benchmarking.

      - question: "63. What are common challenges in using LLMs, such as bias, privacy, cost, and interpretability?"
        answer: |
          Bias remains a core issue because models learn from human-produced text and can reproduce or amplify stereotypes and skewed preferences. NIST’s generative AI profile and OECD guidance both call out bias and fairness risks as central trustworthiness concerns.

          Privacy is another major challenge. Models may memorize or reveal sensitive information from training or from user inputs, and deployed systems may create additional leakage paths through logs, prompts, retrieval, or insecure downstream handling. [OWASP’s LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) specifically highlights sensitive information disclosure as a major application risk.

          Cost is structural, not incidental. Training is expensive, inference is memory- and latency-intensive, and quality controls such as human review, evaluation, and monitoring add more cost. NIST frames these issues as part of deployment and governance trade-offs, not just engineering details.

          Interpretability and transparency are limited because modern LLMs are high-dimensional systems whose outputs are difficult to explain in causal, human-readable terms. HELM explicitly argues for broader transparency and multi-metric evaluation because raw capability numbers are not enough to understand model behavior and risk.

      - question: "64. What are hallucinations in LLMs, and what types exist?"
        answer: |
          Hallucinations are outputs that are fluent and plausible but factually wrong, unsupported, or fabricated. OECD [describes them](https://oecd.ai/en/generative-ai-issues) as convincing but inaccurate outputs, and TruthfulQA was designed precisely to test this failure mode in cases where models tend to mimic human falsehoods.

          A useful practical distinction is between at least three types. First, factual hallucinations, where the model states false claims about the world. Second, grounding or attribution hallucinations, where the model invents sources, citations, quotes, or claims not supported by the provided context. Third, reasoning or consistency failures, where the model has some relevant information but combines it incorrectly or produces internally inconsistent conclusions. TruthfulQA mainly targets the first category, while long-context work such as Lost in the Middle shows how context use failures can contribute to the second and third.

      - question: "65. How do you reduce hallucinations and biased or incorrect outputs?"
        answer: |
          There is no single fix. The most reliable strategy is to combine better grounding, better prompting, better training, and better validation. Grounding methods such as retrieval and constrained context use reduce the need for the model to rely on latent memory alone. Lost in the Middle also shows that it is not enough to stuff more text into context. The position and quality of evidence matter.

          Training-side methods help too. RLHF, DPO, RLAIF, and newer approaches such as deliberative alignment aim to improve truthfulness, refusal behavior, and safety judgments. TruthfulQA also suggests an important lesson: scaling alone does not solve truthfulness. Fine-tuning objectives and evaluation matter.

          At the system level, use structured outputs where possible, validate outputs before downstream use, add source requirements, log failure cases, and include human review for high-stakes tasks. OWASP also [emphasizes](https://owasp.org/www-project-top-10-for-large-language-model-applications/) treating model outputs as untrusted input, which is essential for reducing harm from incorrect or unsafe generations.

      - question: "66. What are the main challenges of deploying LLMs in production?"
        answer: |
          The first set is systems and cost: latency, GPU memory pressure, throughput under concurrency, scaling long contexts, and serving cost. These issues often dominate once a model moves from demo to real traffic. NIST treats operational and lifecycle risks as core deployment concerns, not secondary details.

          The second set is safety and security. [OWASP’s LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) highlights prompt injection, insecure output handling, sensitive information disclosure, model denial of service, excessive agency, and overreliance. These are application-layer risks that do not disappear even if the base model is strong.

          The third set is governance and quality control: evaluation drift, policy updates, auditability, incident response, privacy compliance, and human oversight for high-stakes use cases. NIST’s generative AI profile is useful here because it frames deployment as continuous risk management rather than a one-time launch checklist.

      - question: "67. How do you detect and handle model degradation over time?"
        answer: |
          You detect degradation with a combination of offline regression tests, online monitoring, and human review of sampled failures. Offline, keep a frozen evaluation suite covering your real use cases, including quality, safety, structured output validity, and latency. Online, monitor user feedback, refusal rates, hallucination patterns, routing failures, and changes in distribution such as longer prompts or new domains. NIST’s AI RMF emphasizes ongoing measurement and post-deployment monitoring as part of trustworthy AI practice.

          You also need to watch for distribution shift. This can come from changing user behavior, changing source data, policy updates, new adversarial patterns, or contamination of the information environment with synthetic text. OECD specifically [notes](https://read.oecd-ilibrary.org/en/publications/oecd-digital-economy-outlook-2024-volume-1_a1689dc5-en/full-report/component-5.html) risks from AI-generated content feeding back into future training data and degrading model quality over time.

          Handling degradation usually means some mix of retraining or retuning, prompt and routing adjustments, retrieval improvements, updated guardrails, evaluator refreshes, and rollback capability. The important operational point is to treat degradation as a normal lifecycle issue. You do not assume the model stays equally good after deployment just because the weights are unchanged.


---

Large language models are now a core part of modern AI engineering, but interview expectations have also become broader and more technical. It is no longer enough to know a few prompt engineering terms or to explain LLMs at a high level. As a candidate for an [AI engineer role](/blog/what-is-an-ai-engineer-based-on-job-descriptions), you are expected to understand how these models work internally, how they are trained and adapted, how they behave at inference time, and what it takes to deploy them reliably in production.

This page brings together a structured set of LLM interview questions designed for AI engineer roles. It covers the full path from fundamentals to practical systems thinking: LLM basics, Transformer internals, pretraining and fine-tuning, inference and performance, decoding and prompting, and alignment, evaluation, and reliability.

We expect you to use this list as a starting point for building your preparation strategy. We provide answers and links that you can use to understand the concepts and research the topics in more detail.