'use client'

import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { FormInput } from '@/components/app/form/form-input'
import { ToggleSection } from '@/components/app/form/toggle-section'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { CostFormValues } from '@/lib/types'

interface SecurityComplianceSectionProps {
  control: Control<CostFormValues>
  useCertSoc2: boolean
  useCertIso27001: boolean
  useCertHipaa: boolean
  useCertPciDss: boolean
  useCertGdpr: boolean
  useDdosProtection: boolean
  useWaf: boolean
  useBotProtection: boolean
  useSecurityAudits: boolean
  usePenetrationTesting: boolean
}

interface SecurityItemProps {
  control: Control<CostFormValues>
  name: string
  label: string
  tooltip: string
  isEnabled: boolean
  costTypeName: string
  costName: string
}

function SecurityItem({
  control,
  name,
  label,
  tooltip,
  isEnabled,
  costTypeName,
  costName,
}: SecurityItemProps) {
  return (
    <ToggleSection
      control={control}
      name={name}
      label={label}
      tooltip={tooltip}
      isEnabled={isEnabled}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={costTypeName}>Cost Type</Label>
          <Controller
            control={control}
            name={costTypeName as any}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger id={costTypeName}>
                  <SelectValue placeholder="Select cost type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-time Cost</SelectItem>
                  <SelectItem value="recurring">Recurring Cost (Annual)</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <FormInput
          control={control}
          name={costName}
          label="Cost ($)"
          tooltip="Annual cost or one-time cost based on cost type"
          type="number"
          step={100}
          min={0}
        />
      </div>
    </ToggleSection>
  )
}

export function SecurityComplianceSection({
  control,
  useCertSoc2,
  useCertIso27001,
  useCertHipaa,
  useCertPciDss,
  useCertGdpr,
  useDdosProtection,
  useWaf,
  useBotProtection,
  useSecurityAudits,
  usePenetrationTesting,
}: SecurityComplianceSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Security & Compliance</CardTitle>
        <CardDescription>
          Configure security features and compliance certifications for your
          infrastructure. All costs will be included in TCO calculations and
          categorized as CapEx or OpEx based on cost type.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-evenly gap-6">
          {/* Certifications Column */}
          <div className="space-y-4 flex-1 max-w-xl">
            <h3 className="text-lg font-semibold">Compliance Certifications</h3>

            <SecurityItem
              control={control}
              name="useCertSoc2"
              label="SOC 2 Compliance"
              tooltip="SOC 2 Type II certification for service organizations. Demonstrates security, availability, processing integrity, confidentiality, and privacy controls."
              isEnabled={useCertSoc2}
              costTypeName="certSoc2CostType"
              costName="certSoc2Cost"
            />

            <SecurityItem
              control={control}
              name="useCertIso27001"
              label="ISO 27001 Certification"
              tooltip="International standard for information security management systems (ISMS). Demonstrates systematic approach to managing sensitive company and customer information."
              isEnabled={useCertIso27001}
              costTypeName="certIso27001CostType"
              costName="certIso27001Cost"
            />

            <SecurityItem
              control={control}
              name="useCertHipaa"
              label="HIPAA Compliance"
              tooltip="Health Insurance Portability and Accountability Act compliance for handling protected health information (PHI). Required for healthcare-related services."
              isEnabled={useCertHipaa}
              costTypeName="certHipaaCostType"
              costName="certHipaaCost"
            />

            <SecurityItem
              control={control}
              name="useCertPciDss"
              label="PCI DSS Certification"
              tooltip="Payment Card Industry Data Security Standard for organizations handling credit card transactions. Ensures secure payment processing."
              isEnabled={useCertPciDss}
              costTypeName="certPciDssCostType"
              costName="certPciDssCost"
            />

            <SecurityItem
              control={control}
              name="useCertGdpr"
              label="GDPR Compliance"
              tooltip="General Data Protection Regulation compliance for handling EU citizen data. Includes data protection impact assessments and privacy controls."
              isEnabled={useCertGdpr}
              costTypeName="certGdprCostType"
              costName="certGdprCost"
            />
          </div>

          {/* Security Features Column */}
          <div className="space-y-4 flex-1 max-w-xl">
            <h3 className="text-lg font-semibold">Security Features</h3>

            <SecurityItem
              control={control}
              name="useDdosProtection"
              label="DDoS Protection"
              tooltip="Distributed Denial of Service protection services (e.g., Cloudflare, AWS Shield, Akamai). Protects against volumetric, protocol, and application-layer attacks."
              isEnabled={useDdosProtection}
              costTypeName="ddosProtectionCostType"
              costName="ddosProtectionCost"
            />

            <SecurityItem
              control={control}
              name="useWaf"
              label="Web Application Firewall"
              tooltip="WAF services to protect web applications from common exploits (e.g., AWS WAF, Azure WAF, Cloudflare WAF). Filters malicious traffic and prevents OWASP Top 10 vulnerabilities."
              isEnabled={useWaf}
              costTypeName="wafCostType"
              costName="wafCost"
            />

            <SecurityItem
              control={control}
              name="useBotProtection"
              label="Bot Protection"
              tooltip="Bot management and mitigation services (e.g., DataDome, PerimeterX, Cloudflare Bot Management). Detects and blocks malicious bots while allowing legitimate traffic."
              isEnabled={useBotProtection}
              costTypeName="botProtectionCostType"
              costName="botProtectionCost"
            />

            <SecurityItem
              control={control}
              name="useSecurityAudits"
              label="Security Audits"
              tooltip="Regular security assessments and compliance audits by third-party firms. Includes vulnerability assessments, compliance gap analysis, and remediation recommendations."
              isEnabled={useSecurityAudits}
              costTypeName="securityAuditsCostType"
              costName="securityAuditsCost"
            />

            <SecurityItem
              control={control}
              name="usePenetrationTesting"
              label="Penetration Testing"
              tooltip="Ethical hacking and penetration testing services to identify security vulnerabilities. Includes network, application, and social engineering tests with detailed reports."
              isEnabled={usePenetrationTesting}
              costTypeName="penetrationTestingCostType"
              costName="penetrationTestingCost"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
