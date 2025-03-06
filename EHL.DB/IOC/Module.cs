﻿using EHL.DB.Implements;
using EHL.DB.Infrastructure;
using EHL.DB.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EHL.DB.IOC
{
	public static class Module
	{
		public static Dictionary<Type, Type> GetTypes()
		{
			var dic = new Dictionary<Type, Type>
			{
				{typeof(IUserDB), typeof(UserDB) },
				{typeof(ILandingPageDB), typeof(LandingPageDB) },
				{typeof(IAttributeDB), typeof(AttributeDB) }
			};
			return dic;
		}
	}
}
