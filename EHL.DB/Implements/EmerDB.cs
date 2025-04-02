using Dapper;
using EHL.Common.Models;
using EHL.DB.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EHL.DB.Implements
{
	public class EmerDB : BaseDB, IEmerDB
	{
		public EmerDB(IConfiguration configuration) : base(configuration)
		{

		}

		public List<EmerModel> GetAllEmer()
		{
			try
			{
				string query = string.Format(@"select * from emer  where isactive = 1");
				var result = connection.Query<EmerModel>(query).ToList();
				return result;
			}
			catch (Exception ex)
			{
				throw ex;
			}

		}
		public List<EmerModel> GetAllMasterSheet()
		{
			try
			{
				string query = string.Format(@"select * from mastersheet  where isactive = 1");
				var result = connection.Query<EmerModel>(query).ToList();
				return result;
			}
			catch (Exception ex)
			{
				throw ex;
			}

		}
		public bool AddEmer(EmerModel emer)
		{
			try
			{
				// Ensure that CreatedOn and UpdatedOn are DateTime values before the insert
				if (emer.CreatedOn == default)
					emer.CreatedOn = DateTime.Now;

				if (emer.UpdatedOn == default)
					emer.UpdatedOn = DateTime.Now;

				string query = @"insert into emer 
                            (emernumber, subject, subfunction, category, subcategory, categoryid, subcategoryid, eqpt, remarks, fileid, createdby, createdon, isactive,wing,wingid)
                          values 
                            (@emernumber, @subject, @subfunction, @category, @subcategory, @categoryid, @subcategoryid, @eqpt, @remarks, @fileid, @createdby, @createdon, @isactive,@wing,@wingid)";

				var result = connection.Execute(query, emer);
				return result > 0;
			}
			catch (Exception ex)
			{
				// Handle exception (Log it)
				throw ex;
			}
		}

		public bool UpdateEmer(EmerModel emer)
		{
			try
			{
				string query = string.Format(@"update emer set emernumber=@emernumber,subject=@subject,subfunction=@subfunction,category=@category,subcategory=@subcategory,eqpt=@eqpt,metainfo=@metainfo,fileid=@fileid,updatedby=@updateby,updatedon=@updateon,isactive=@isactive where id = @id");
				var result = connection.Execute(query, emer);
				return result > 0;
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
		public bool DeactivateEmer(long Id)
		{
			try
			{
				string query = string.Format(@"update emer set isactive=0 where id = @id");
				var result = connection.Execute(query);
				return result > 0;
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}

		public long AddFile(Documents document)
		{
			try
			{
				// Ensure that the Document (byte array) is being passed correctly
				if (document.Document == null || document.Document.Length == 0)
				{
					throw new ArgumentException("Document content cannot be empty.");
				}

				string query = @"
            INSERT INTO documents (document, filetype, name, size, createdby, updatedby, createdon, isactive, isdeleted)
            VALUES (@document, @filetype, @name, @size, @createdby, @updatedby, @createdon, @isactive, @isdeleted);
            SELECT CAST(SCOPE_IDENTITY() AS BIGINT);";

				// Use Dapper to execute the query and insert the file data into the database
				var parameters = new
				{
					document.Document,        // Store the file content as VARBINARY
					document.FileType,        // File extension (e.g., pdf, docx)
					document.Name,            // File name
					document.Size,            // File size in bytes
					document.CreatedBy,       // Created by user
					document.UpdatedBy,       // Updated by user
					CreatedOn = DateTime.Now, // Created on timestamp
					IsActive = true,          // Active flag
					IsDeleted = false         // Deleted flag
				};

				// Execute the query and get the inserted ID
				var id = connection.ExecuteScalar<long>(query, parameters);

				return id;
			}
			catch (Exception ex)
			{
				throw new Exception("An error occurred while inserting the document.", ex);
			}
		}


	}
}
