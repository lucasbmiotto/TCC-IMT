import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Hash, Calendar, MapPin, Users, BookOpen } from 'lucide-react';

const iconMap = {
  nome: User,
  cpf: Hash,
  'data-nascimento': Calendar,
  filiacao: Users,
  cidade: MapPin,
  'numero-registro': BookOpen
};

export const documentFieldsConfig = {
  rg: [
    { id: 'nome', label: 'Nome Completo', type: 'text', placeholder: 'Ex: João da Silva' },
    { id: 'cpf', label: 'CPF', type: 'text', placeholder: '000.000.000-00' },
    { id: 'data-nascimento', label: 'Data de Nascimento', type: 'date' },
    { id: 'filiacao', label: 'Filiação', type: 'text', placeholder: 'Ex: Maria da Silva e José da Silva' },
  ],
  cnh: [
    { id: 'nome', label: 'Nome Completo', type: 'text', placeholder: 'Ex: João da Silva' },
    { id: 'cpf', label: 'CPF', type: 'text', placeholder: '000.000.000-00' },
    { id: 'data-nascimento', label: 'Data de Nascimento', type: 'date' },
    { id: 'numero-registro', label: 'Número de Registro', type: 'text', placeholder: '01234567890' },
  ],
  nascimento: [
    { id: 'nome', label: 'Nome Completo', type: 'text', placeholder: 'Ex: João da Silva' },
    { id: 'data-nascimento', label: 'Data de Nascimento', type: 'date' },
    { id: 'filiacao', label: 'Filiação', type: 'text', placeholder: 'Ex: Maria da Silva e José da Silva' },
    { id: 'cidade', label: 'Cidade de Nascimento', type: 'text', placeholder: 'Ex: São Paulo' },
  ],
  outro: [],
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100
        }
    }
};

const DynamicFormFields = ({ documentType, formData, onDataChange }) => {
  const fields = documentFieldsConfig[documentType] || [];

  if (fields.length === 0 && documentType !== 'outro') {
    return null;
  }
  
  if (documentType === 'outro') {
    return (
        <motion.div 
            variants={itemVariants} 
            className="text-center text-sm text-muted-foreground p-4 bg-accent rounded-md"
        >
            Para documentos do tipo "Outro", apenas o DID e o arquivo de complemento são necessários.
        </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {fields.map((field) => {
        const Icon = iconMap[field.id] || User;
        return (
          <motion.div key={field.id} variants={itemVariants} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
                <Icon className="w-4 h-4"/>
                {field.label}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder || ''}
              value={formData[field.id] || ''}
              onChange={(e) => onDataChange(field.id, e.target.value)}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default DynamicFormFields;