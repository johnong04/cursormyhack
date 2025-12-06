"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, AlertCircle, Zap, FileText, Plug } from "lucide-react";

export default function AdminPage() {
  const [questionGenStatus, setQuestionGenStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [questionGenMessage, setQuestionGenMessage] = useState("");
  
  const [apifyStatus, setApifyStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [apifyMessage, setApifyMessage] = useState("");

  const [geminiTestStatus, setGeminiTestStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [geminiTestMessage, setGeminiTestMessage] = useState("");

  const [elevenLabsTestStatus, setElevenLabsTestStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [elevenLabsTestMessage, setElevenLabsTestMessage] = useState("");

  const generateQuestionsAction = useAction(api.ai.generateSejarahBab4Bank);
  const fetchTrialPapersAction = useAction(api.apify.fetchTrialPapers);
  const testGeminiAction = useAction(api.test.testGeminiConnection);
  const testElevenLabsAction = useAction(api.test.testElevenLabsConnection);

  const handleGenerateQuestions = async () => {
    setQuestionGenStatus("loading");
    setQuestionGenMessage("");
    
    try {
      const result = await generateQuestionsAction({});
      
      if (result.success) {
        setQuestionGenStatus("success");
        setQuestionGenMessage(result.message);
      } else {
        setQuestionGenStatus("error");
        setQuestionGenMessage(result.message || "Failed to generate questions");
      }
    } catch (error) {
      setQuestionGenStatus("error");
      setQuestionGenMessage(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const handleFetchTrialPapers = async () => {
    setApifyStatus("loading");
    setApifyMessage("");
    
    try {
      const result = await fetchTrialPapersAction({ subject: "Sejarah" });
      
      if (result.success) {
        setApifyStatus("success");
        setApifyMessage(result.message || "Success!");
      } else {
        setApifyStatus("error");
        setApifyMessage(result.message || "Failed to fetch trial papers");
      }
    } catch (error) {
      setApifyStatus("error");
      setApifyMessage(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const handleTestGemini = async () => {
    setGeminiTestStatus("loading");
    setGeminiTestMessage("");
    
    try {
      const result = await testGeminiAction({});
      
      if (result.success) {
        setGeminiTestStatus("success");
        setGeminiTestMessage(result.message + (result.response ? ` Response: "${result.response}"` : ""));
      } else {
        setGeminiTestStatus("error");
        setGeminiTestMessage(result.message || "Failed to connect to Gemini");
      }
    } catch (error) {
      setGeminiTestStatus("error");
      setGeminiTestMessage(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const handleTestElevenLabs = async () => {
    setElevenLabsTestStatus("loading");
    setElevenLabsTestMessage("");
    
    try {
      const result = await testElevenLabsAction({});
      
      if (result.success) {
        setElevenLabsTestStatus("success");
        setElevenLabsTestMessage(result.message);
      } else {
        setElevenLabsTestStatus("error");
        setElevenLabsTestMessage(result.message || "Failed to connect to ElevenLabs");
      }
    } catch (error) {
      setElevenLabsTestStatus("error");
      setElevenLabsTestMessage(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage question generation and background tasks
        </p>
      </div>

      {/* API Connection Tests */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Plug className="h-5 w-5" />
            API Connection Tests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Test your API connections before generating questions. Make sure both tests pass!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gemini Test */}
            <div className="space-y-2">
              <Button 
                onClick={handleTestGemini}
                disabled={geminiTestStatus === "loading"}
                variant="outline"
                className="w-full gap-2"
                size="sm"
              >
                {geminiTestStatus === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                {geminiTestStatus === "success" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                {geminiTestStatus === "error" && <AlertCircle className="h-4 w-4 text-red-600" />}
                Test Gemini API
              </Button>
              
              {geminiTestMessage && (
                <div className={`p-2 rounded text-xs ${
                  geminiTestStatus === "success" 
                    ? "bg-green-50 text-green-900 border border-green-200" 
                    : geminiTestStatus === "error"
                    ? "bg-red-50 text-red-900 border border-red-200"
                    : "bg-gray-50 text-gray-900 border border-gray-200"
                }`}>
                  {geminiTestMessage}
                </div>
              )}
            </div>

            {/* ElevenLabs Test */}
            <div className="space-y-2">
              <Button 
                onClick={handleTestElevenLabs}
                disabled={elevenLabsTestStatus === "loading"}
                variant="outline"
                className="w-full gap-2"
                size="sm"
              >
                {elevenLabsTestStatus === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                {elevenLabsTestStatus === "success" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                {elevenLabsTestStatus === "error" && <AlertCircle className="h-4 w-4 text-red-600" />}
                Test ElevenLabs API
              </Button>
              
              {elevenLabsTestMessage && (
                <div className={`p-2 rounded text-xs ${
                  elevenLabsTestStatus === "success" 
                    ? "bg-green-50 text-green-900 border border-green-200" 
                    : elevenLabsTestStatus === "error"
                    ? "bg-red-50 text-red-900 border border-red-200"
                    : "bg-gray-50 text-gray-900 border border-gray-200"
                }`}>
                  {elevenLabsTestMessage}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Generation Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Generate Sejarah Bab 4 Question Bank
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Uses Gemini AI to generate 5 Q&A pairs for Sejarah Bab 4 (Malayan Union) with comic prompts
            and voice explanation scripts. This should be run once before using the Reveal feature.
          </p>
          
          <Button 
            onClick={handleGenerateQuestions}
            disabled={questionGenStatus === "loading"}
            className="w-full gap-2"
          >
            {questionGenStatus === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {questionGenStatus === "success" && <CheckCircle2 className="h-4 w-4" />}
            {questionGenStatus === "error" && <AlertCircle className="h-4 w-4" />}
            {questionGenStatus === "loading" ? "Generating..." : "Generate Questions"}
          </Button>

          {questionGenMessage && (
            <div className={`p-3 rounded-lg text-sm ${
              questionGenStatus === "success" 
                ? "bg-green-50 text-green-900 border border-green-200" 
                : "bg-red-50 text-red-900 border border-red-200"
            }`}>
              {questionGenMessage}
            </div>
          )}

          {questionGenStatus === "idle" && (
            <div className="p-3 rounded-lg text-sm bg-blue-50 text-blue-900 border border-blue-200">
              <strong>Note:</strong> Make sure you have set your GEMINI_API_KEY in .env.local before running this action.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Apify Trial Papers Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Fetch Trial Papers (Apify)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Fetches trial paper links for Sejarah using Apify. If APIFY_API_TOKEN is not set,
            this will use mock data for demonstration purposes.
          </p>
          
          <Button 
            onClick={handleFetchTrialPapers}
            disabled={apifyStatus === "loading"}
            variant="outline"
            className="w-full gap-2"
          >
            {apifyStatus === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {apifyStatus === "success" && <CheckCircle2 className="h-4 w-4" />}
            {apifyStatus === "error" && <AlertCircle className="h-4 w-4" />}
            {apifyStatus === "loading" ? "Fetching..." : "Fetch Trial Papers"}
          </Button>

          {apifyMessage && (
            <div className={`p-3 rounded-lg text-sm ${
              apifyStatus === "success" 
                ? "bg-green-50 text-green-900 border border-green-200" 
                : "bg-red-50 text-red-900 border border-red-200"
            }`}>
              {apifyMessage}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base">Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Add your <Badge variant="outline" className="font-mono">GEMINI_API_KEY</Badge> to{" "}
              <code className="bg-muted px-1 py-0.5 rounded">.env.local</code>
            </li>
            <li>
              Add your <Badge variant="outline" className="font-mono">ELEVENLABS_API_KEY</Badge> to{" "}
              <code className="bg-muted px-1 py-0.5 rounded">.env.local</code>
            </li>
            <li>Restart the dev server if you just added the keys</li>
            <li>Click "Generate Questions" above to create the Q&A bank</li>
            <li>Go to the <a href="/study" className="text-primary underline">Study page</a> and try the Reveal feature!</li>
          </ol>
          
          <div className="pt-4 border-t border-border/40 mt-4">
            <p className="text-xs">
              For detailed setup instructions, see <code className="bg-muted px-1 py-0.5 rounded">SETUP.md</code> in the project root.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

